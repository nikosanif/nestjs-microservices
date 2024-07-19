import { Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { OAuthClientCreationError, OAuthClientEntity } from '../domain';

import { CreateOAuthClientCommand, CreateOAuthClientHandler } from './commands';

@Injectable()
export class OAuthClientsFacade {
  constructor(private readonly createOAuthClientHandler: CreateOAuthClientHandler) {}

  create(
    command: CreateOAuthClientCommand
  ): Promise<Result<OAuthClientEntity, OAuthClientCreationError>> {
    return this.createOAuthClientHandler.execute(command);
  }
}
