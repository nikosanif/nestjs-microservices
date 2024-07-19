import { Command, Console } from 'nestjs-console';

import { UseCliRequestContext } from '@nmsvc/sdk/api';
import { Logger } from '@nmsvc/sdk/common';
import { ObjectLiteral } from '@nmsvc/sdk/types';
import { Validator } from '@nmsvc/sdk/utils';

import { CreateRootUserCommand, CreateUserCommand, UsersFacade } from '../application';

import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Console({
  command: 'users',
  description: 'Users management',
})
export class UserCliController {
  constructor(
    private readonly logger: Logger,
    private readonly usersFacade: UsersFacade
  ) {}

  @UseCliRequestContext()
  @Command({
    command: 'create',
    description: 'Create a user',
    options: [
      {
        flags: '-e, --email <email>',
        required: true,
        description: 'Email',
      },
      {
        flags: '-fn, --firstName <firstName>',
        required: true,
        description: 'First name',
      },
      {
        flags: '-ln, --lastName <lastName>',
        required: true,
        description: 'Last name',
      },
      {
        flags: '-u, --username <username>',
        required: true,
        description: 'Username',
      },
      {
        flags: '-p, --password <password>',
        required: true,
        description: 'Password',
      },
      {
        flags: '-r, --roleSlug <roleSlug>',
        required: false,
        description: 'Role slug',
      },
    ],
  })
  async createUser(dtoLike: ObjectLiteral): Promise<void> {
    const dto = new CreateUserRequestDto(dtoLike);
    await Validator.validateOrFail(dto);

    const command = new CreateUserCommand(dto);
    const { val: result, err } = await this.usersFacade.create(command);

    if (err) throw result;

    this.logger.log(`User created with id: ${result.id}`);
  }

  @UseCliRequestContext()
  @Command({
    command: 'create-root',
    description: 'Create a root user',
    options: [
      {
        flags: '-e, --email <email>',
        required: true,
        description: 'Email',
      },
      {
        flags: '-fn, --firstName <firstName>',
        required: true,
        description: 'First name',
      },
      {
        flags: '-ln, --lastName <lastName>',
        required: true,
        description: 'Last name',
      },
      {
        flags: '-u, --username <username>',
        required: true,
        description: 'Username',
      },
      {
        flags: '-p, --password <password>',
        required: true,
        description: 'Password',
      },
    ],
  })
  async createRootUser(dtoLike: ObjectLiteral): Promise<void> {
    const dto = new CreateUserRequestDto(dtoLike);
    await Validator.validateOrFail(dto);

    const command = new CreateRootUserCommand(dto);
    const { val: result, err } = await this.usersFacade.createRootUser(command);

    if (err) throw result;

    this.logger.log(`Root user created with id: ${result.id}`);
  }
}
