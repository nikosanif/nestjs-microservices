import { Inject, Injectable } from '@nestjs/common';
import { Err, Result } from 'ts-results';

import { CommandHandler } from '@nmsvc/sdk/ddd';
import { NotFoundException } from '@nmsvc/sdk/exceptions';

import {
  RootUserIsNotEditableError,
  UserUpdateError,
  UserEntity,
  UserNotFoundError,
  UserRepositoryPort,
  UserAlreadyExistsError,
} from '../../domain';
import { USER_REPOSITORY } from '../../users.di-tokens';

import { UpdateUserCommand } from './update-user.command';

@Injectable()
export class UpdateUserHandler
  implements CommandHandler<UpdateUserCommand, Result<UserEntity, UserUpdateError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort
  ) {}

  async execute(command: UpdateUserCommand): Promise<Result<UserEntity, UserUpdateError>> {
    const { userId, userProps } = command;

    // check if the user is root user
    // root user is not editable
    const isRootUser = await this.userRepository.isRootUser(`${userId}`);
    if (isRootUser) {
      return new Err(new RootUserIsNotEditableError());
    }

    const result = await this.userRepository.updateById(userId, userProps);

    // convert the generic error to a domain error
    return result.mapErr(error => {
      if (error instanceof NotFoundException) {
        return new UserNotFoundError(error);
      }
      return new UserAlreadyExistsError(error);
    });
  }
}
