import { Inject, Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { Result } from 'ts-results';

import { OAUTH_CLIENT_REPOSITORY } from '../auth.di-tokens';
import { AuthConfigService } from '../config';
import {
  OAuthClientAlreadyExistsError,
  OAuthClientCreationError,
  OAuthClientEntity,
  OAuthClientRepositoryPort,
} from '../domain';

import { CreateOAuthClientCommand } from './commands';

@Injectable()
export class OAuthClientsFacade {
  constructor(
    @Inject(OAUTH_CLIENT_REPOSITORY)
    protected readonly oauthClientRepository: OAuthClientRepositoryPort,
    private readonly authConfigService: AuthConfigService
  ) {}

  async create(
    command: CreateOAuthClientCommand
  ): Promise<Result<OAuthClientEntity, OAuthClientCreationError>> {
    const client = this.toDomain(command);
    const result = await this.oauthClientRepository.create(client);

    // convert the generic error to a domain error
    return result.mapErr(error => new OAuthClientAlreadyExistsError(error));
  }

  private toDomain(command: CreateOAuthClientCommand): OAuthClientEntity {
    const client = new OAuthClientEntity();

    client.name = command.name;
    client.grants = command.grants;
    client.clientId = command.clientId;

    client.redirectUris = command.redirectUris || [];
    client.accessTokenLifetime =
      command.accessTokenLifetime || this.authConfigService.defaultAccessTokenLifetime;
    client.refreshTokenLifetime =
      command.refreshTokenLifetime || this.authConfigService.defaultRefreshTokenLifetime;

    client.clientSecret = this.generateClientSecret();

    return client;
  }

  private generateClientSecret(): string {
    const secretLength = 40;
    // Define the characters to be used in the client secret
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let clientSecret = '';
    for (let i = 0; i < secretLength; i++) {
      const randomIndex = randomInt(0, charactersLength);
      clientSecret += characters[randomIndex];
    }

    return clientSecret;
  }
}
