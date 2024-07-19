import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { CommandHandler } from '@nmsvc/sdk/ddd';

import {
  RootUserIsNotEditableError,
  UserCredentialsRepositoryPort,
  UserDeletionError,
  UserNotFoundError,
  UserRepositoryPort,
} from '../../domain';
import { USER_CREDENTIALS_REPOSITORY, USER_REPOSITORY } from '../../users.di-tokens';

import { DeleteUserCommand } from './delete-user.command';

@Injectable()
export class DeleteUserHandler
  implements CommandHandler<DeleteUserCommand, Result<boolean, UserDeletionError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
    @Inject(USER_CREDENTIALS_REPOSITORY)
    protected readonly userCredentialsRepository: UserCredentialsRepositoryPort
  ) {}

  async execute(command: DeleteUserCommand): Promise<Result<boolean, UserDeletionError>> {
    const found = await this.userRepository.findById(command.userId);

    if (found.none) {
      return new Err(new UserNotFoundError());
    }

    // check if the user is root user
    // root user is not editable
    const isRootUser = await this.userRepository.isRootUser(`${command.userId}`);
    if (isRootUser) {
      return new Err(new RootUserIsNotEditableError());
    }

    // delete user credentials first
    const credentialsDeleted = await this.userCredentialsRepository.deleteByUserId(
      command.userId as string
    );
    // delete user
    const userDeleted = await this.userRepository.deleteById(command.userId);

    // FIXME: handle !isOk (throw an exception or return a different result)
    return new Ok(userDeleted && credentialsDeleted);
  }
}
