import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';
import { NonEmptyArray } from '@nmsvc/sdk/types';

import { AuthClientGrantEnum } from '../../domain';

export class CreateOAuthClientCommand extends AbstractCommand {
  readonly name!: string;
  readonly clientId!: string;
  readonly grants!: NonEmptyArray<AuthClientGrantEnum>;

  readonly redirectUris?: string[];
  readonly accessTokenLifetime?: number;
  readonly refreshTokenLifetime?: number;

  constructor(props: CommandProps<CreateOAuthClientCommand>) {
    super(props);

    this.name = props.name;
    this.clientId = props.clientId;
    this.grants = props.grants;
    this.redirectUris = props.redirectUris;
    this.accessTokenLifetime = props.accessTokenLifetime;
    this.refreshTokenLifetime = props.refreshTokenLifetime;
  }
}
