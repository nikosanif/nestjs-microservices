import NodeOAuthServer = require('@node-oauth/oauth2-server');
import * as jwt from 'jsonwebtoken';

import { Logger } from '@nmsvc/sdk/common';
import { EntityId } from '@nmsvc/sdk/db';

import {
  OAuthClientEntity,
  OAuthClientRepositoryPort,
  OAuthTokenEntity,
  OAuthTokenRepositoryPort,
  OAuthUserProps,
  OAuthUserRepositoryPort,
} from '../../domain';

const ALL_SCOPES = '*';

interface JwtPayload {
  userId: EntityId;
  clientId: string;
  scope: string;
}

export class OAuthFlowModel
  implements
    NodeOAuthServer.PasswordModel,
    NodeOAuthServer.RefreshTokenModel,
    NodeOAuthServer.ClientCredentialsModel
{
  private readonly logger = new Logger(OAuthFlowModel.name);

  constructor(
    private readonly oauthClientRepository: OAuthClientRepositoryPort,
    private readonly oAuthTokenRepository: OAuthTokenRepositoryPort,
    private readonly oauthUserRepository: OAuthUserRepositoryPort,
    private readonly accessTokenSecret: string,
    private readonly refreshTokenSecret: string
  ) {}

  async generateAccessToken(
    client: NodeOAuthServer.Client,
    user: NodeOAuthServer.User,
    scope: string[]
  ): Promise<string> {
    this.debug('generateAccessToken', { client, user, scope });

    const payload: JwtPayload = {
      userId: this.oauthUserRepository.getId(user as OAuthUserProps),
      clientId: client.id,
      scope: scope.join(' '),
    };

    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: client.accessTokenLifetime });
  }

  async generateRefreshToken(
    client: NodeOAuthServer.Client,
    user: NodeOAuthServer.User,
    scope: string[]
  ): Promise<string> {
    this.debug('generateRefreshToken', { client, user, scope });

    const payload: JwtPayload = {
      userId: this.oauthUserRepository.getId(user as OAuthUserProps),
      clientId: client.id,
      scope: scope.join(' '),
    };

    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: client.refreshTokenLifetime });
  }

  async getAccessToken(
    accessToken: string
  ): Promise<NodeOAuthServer.Token | NodeOAuthServer.Falsey> {
    this.debug('getAccessToken', { accessToken });

    const payload = jwt.verify(accessToken, this.accessTokenSecret) as JwtPayload;

    // try to find the token by the access token
    const maybeToken = await this.oAuthTokenRepository.findOneByAccessToken(
      accessToken,
      payload.userId
    );
    const token = maybeToken.unwrapOr(null);
    if (!token) return null;

    // try to find the user by the user id
    const user = await this.oauthUserRepository.findById(token.userId);
    if (!user) return null;

    return { ...token, user };
  }

  async getRefreshToken(
    refreshToken: string
  ): Promise<NodeOAuthServer.Falsey | NodeOAuthServer.RefreshToken> {
    this.debug('getRefreshToken', { refreshToken });

    const payload = jwt.verify(refreshToken, this.refreshTokenSecret) as JwtPayload;

    // try to find the token by the refresh token
    const maybeToken = await this.oAuthTokenRepository.findOneByRefreshToken(
      refreshToken,
      payload.userId
    );
    const token = maybeToken.unwrapOr(null);
    if (!token) return null;

    // try to find the client by the client id
    const maybeClient = await this.oauthClientRepository.findById(token.clientId);
    const client = maybeClient.unwrapOr(null);
    if (!client) return null;

    // try to find the user by the user id
    const user = await this.oauthUserRepository.findById(token.userId);
    if (!user) return null;

    return { ...token, client, user };
  }

  async validateScope(
    user: NodeOAuthServer.User,
    client: NodeOAuthServer.Client,
    scope?: string[] | undefined
  ): Promise<string[] | NodeOAuthServer.Falsey> {
    this.debug('validateScope', { user, client, scope });

    // Check if the requested scope is valid for a particular client/user combination.
    // For now, we are allowing all scopes
    return [ALL_SCOPES];
  }

  async getClient(
    clientId: string,
    clientSecret: string
  ): Promise<NodeOAuthServer.Client | NodeOAuthServer.Falsey> {
    this.debug('getClient', { clientId, clientSecret });

    const client = await this.oauthClientRepository.findOneByIdAndSecret(clientId, clientSecret);
    return client.unwrapOr(null);
  }

  async saveToken(
    token: NodeOAuthServer.Token,
    client: NodeOAuthServer.Client,
    user: NodeOAuthServer.User
  ): Promise<NodeOAuthServer.Token | NodeOAuthServer.Falsey> {
    this.debug('saveToken', { token, client, user });

    const oauthClient = client as OAuthClientEntity;

    const refreshTokenExpiresAt = token.refreshTokenExpiresAt
      ? // if the refresh token lifetime is set, then we will use it
        token.refreshTokenExpiresAt
      : // else in case the refresh token lifetime is not set (e.g. for client credentials flow), we will calculate it manually
        new Date(Date.now() + oauthClient.refreshTokenLifetime * 1000);

    const refreshToken = token.refreshToken
      ? // if the refresh token is provided, then we will use it
        token.refreshToken
      : // if the refresh token is not provided, then we will generate it
        await this.generateRefreshToken(oauthClient, user, token.scope || []);

    const maybeToken = await this.oAuthTokenRepository.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      scope: token.scope,
      client: oauthClient,
      userId: this.oauthUserRepository.getId(user as OAuthUserProps),
    });

    // case: error occurred during token creation
    // in this case, we need to throw the error instead of a falsey value
    if (maybeToken.err) throw maybeToken.val;

    return { ...maybeToken.val, client: oauthClient, user };
  }

  async revokeToken(token: NodeOAuthServer.RefreshToken): Promise<boolean> {
    this.debug('revokeToken', { token });

    const tokenId = (token as OAuthTokenEntity).id;
    return this.oAuthTokenRepository.deleteById(tokenId);
  }

  async getUser(
    username: string,
    password: string,
    client: NodeOAuthServer.Client
  ): Promise<NodeOAuthServer.User | NodeOAuthServer.Falsey> {
    this.debug('getUser', { username, password, client });

    return this.oauthUserRepository.findOneByUsernameAndPassword(username, password);
  }

  async getUserFromClient(
    client: NodeOAuthServer.Client
  ): Promise<NodeOAuthServer.User | NodeOAuthServer.Falsey> {
    this.debug('getUserFromClient', { client });

    return this.oauthUserRepository.findSystemUser();
  }

  async verifyScope(token: NodeOAuthServer.Token, scope: string[]): Promise<boolean> {
    this.debug('verifyScope', { token, scope });

    const tokenScopes = token.scope || [];

    // check if the token has all scopes, then allow access
    const allScopes = tokenScopes.includes(ALL_SCOPES);
    if (allScopes) return true;

    // check if token's scope is subset of the target scopes
    return scope.every(s => tokenScopes.includes(s));
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  private debug(method: string, context: Record<string, unknown>) {
    this.logger.debug(`[${method}]`);
  }
}
