import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

import { RoleSlugEnum } from '../../domain';

export class CreateUserCommand extends AbstractCommand {
  readonly username!: string;
  readonly email!: string;
  readonly firstName!: string;
  readonly lastName!: string;
  readonly password!: string;
  readonly roleSlug?: RoleSlugEnum;
  readonly isRoot: boolean = false;

  constructor(props: Omit<CommandProps<CreateUserCommand>, 'isRoot'>) {
    super(props);

    this.username = props.username;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.roleSlug = props.roleSlug;
  }
}

export class CreateRootUserCommand extends CreateUserCommand {
  override readonly isRoot = true;

  constructor(props: Omit<CommandProps<CreateRootUserCommand>, 'isRoot'>) {
    super({ ...props, roleSlug: RoleSlugEnum.SysAdmin });
  }
}
