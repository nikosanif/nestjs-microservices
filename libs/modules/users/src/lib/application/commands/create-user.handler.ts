import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { CommandHandler } from '@nmsvc/sdk/ddd';
import { PasswordUtil } from '@nmsvc/sdk/utils';

import {
  RoleNotFoundError,
  RoleRepositoryPort,
  RoleSlugEnum,
  UserAlreadyExistsError,
  UserCreationError,
  UserCredentialCreationError,
  UserCredentialsRepositoryPort,
  UserEntity,
  UserRepositoryPort,
} from '../../domain';
import {
  ROLE_REPOSITORY,
  USER_CREDENTIALS_REPOSITORY,
  USER_REPOSITORY,
} from '../../users.di-tokens';

import { CreateUserCommand } from './create-user.command';

@Injectable()
export class CreateUserHandler
  implements CommandHandler<CreateUserCommand, Result<UserEntity, UserCreationError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
    @Inject(ROLE_REPOSITORY)
    protected readonly roleRepository: RoleRepositoryPort,
    @Inject(USER_CREDENTIALS_REPOSITORY)
    protected readonly userCredentialsRepository: UserCredentialsRepositoryPort
  ) {}

  async execute(command: CreateUserCommand): Promise<Result<UserEntity, UserCreationError>> {
    const user = await this.toDomain(command);
    const maybeUser = await this.userRepository.create(user);

    // if error occurred during creation, convert the generic error to a domain error
    if (maybeUser.err) {
      return maybeUser.mapErr(error => new UserAlreadyExistsError(error));
    }

    // create user credentials
    const maybeCredentials = await this.userCredentialsRepository.create({
      userId: maybeUser.val.id,
      passwordHash: PasswordUtil.generatePasswordHash(command.password),
    });

    // if error occurred during credentials creation, return the error
    if (maybeCredentials.err) {
      return maybeCredentials.mapErr(error => new UserCredentialCreationError(error));
    }

    return maybeUser;
  }

  private async toDomain(command: CreateUserCommand): Promise<UserEntity> {
    const roleSlug = command.roleSlug || RoleSlugEnum.User;
    const role = await this.roleRepository.findOneBySlug(roleSlug);

    if (role.none) throw new RoleNotFoundError();

    const user = new UserEntity();
    user.username = command.username;
    user.email = command.email;
    user.firstName = command.firstName;
    user.lastName = command.lastName;
    user.isRoot = command.isRoot;
    user.role = role.unwrap();

    return user;
  }
}
