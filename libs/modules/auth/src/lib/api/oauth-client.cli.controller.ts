import { Command, Console } from 'nestjs-console';

import { UseCliRequestContext } from '@nmsvc/sdk/api';
import { Logger } from '@nmsvc/sdk/common';
import { ObjectLiteral } from '@nmsvc/sdk/types';
import { Validator } from '@nmsvc/sdk/utils';

import { CreateOAuthClientCommand, OAuthClientsFacade } from '../application';

import { CreateOAuthClientRequestDto } from './dto/create-oauth-client.request.dto';

@Console({
  command: 'oauth-clients',
  description: 'OAuth clients management',
})
export class OAuthClientCliController {
  constructor(
    private readonly logger: Logger,
    private readonly oAuthClientsFacade: OAuthClientsFacade
  ) {}

  @UseCliRequestContext()
  @Command({
    command: 'create',
    description: 'Create an OAuth client',
    options: [
      {
        flags: '-n, --name <name>',
        required: true,
        description: 'Name',
      },
      {
        flags: '-ci, --clientId <clientId>',
        required: true,
        description: 'Client ID',
      },
      {
        flags: '-g, --grants <grants>',
        required: true,
        description: 'Comma-separated list of allowed grants',
        fn: (value: string) => value.split(','),
      },
      {
        flags: '-ru, --redirectUris <redirectUris>',
        required: false,
        description: 'Comma-separated list of allowed redirect URIs',
        fn: (value: string) => value.split(','),
      },
      {
        flags: '-atl, --accessTokenLifetime <accessTokenLifetime>',
        required: false,
        description: 'Access token lifetime in seconds',
        fn: (value: string) => parseInt(value, 10),
      },
      {
        flags: '-rtl, --refreshTokenLifetime <refreshTokenLifetime>',
        required: false,
        description: 'Refresh token lifetime in seconds',
        fn: (value: string) => parseInt(value, 10),
      },
    ],
  })
  async createClient(dtoLike: ObjectLiteral): Promise<void> {
    const dto = new CreateOAuthClientRequestDto(dtoLike);
    await Validator.validateOrFail(dto);

    const command = new CreateOAuthClientCommand(dto);
    const { val: result, err } = await this.oAuthClientsFacade.create(command);

    if (err) throw result;

    this.logger.log(`OAuth client created: ${result.id}`);
    this.logger.log(`Client ID: ${result.clientId}`);
    this.logger.log(`Client secret: ${result.clientSecret}`);
    this.logger.log('Please store the client id and secret securely!');
  }
}
