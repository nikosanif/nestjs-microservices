import { Client as OAuth2Client } from '@node-oauth/oauth2-server';

import { BaseEntityProps } from '@nmsvc/sdk/db';

export enum AuthClientGrantEnum {
  Password = 'password',
  RefreshToken = 'refresh_token',
  ClientCredentials = 'client_credentials',
  AuthorizationCode = 'authorization_code',
}

export interface OAuthClientProps extends BaseEntityProps, OAuth2Client {
  id: string;
  redirectUris: string[];
  grants: AuthClientGrantEnum[];
  accessTokenLifetime: number;
  refreshTokenLifetime: number;
  clientId: string;
  clientSecret: string;
  name: string;
}
