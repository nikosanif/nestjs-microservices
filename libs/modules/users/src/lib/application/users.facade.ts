import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { NotFoundException } from '@nmsvc/sdk/exceptions';
import { Pagination } from '@nmsvc/sdk/types';
import { PasswordUtil } from '@nmsvc/sdk/utils';

import {
  RoleNotFoundError,
  RoleRepositoryPort,
  RoleSlugEnum,
  RootUserIsNotEditableError,
  UserAlreadyExistsError,
  UserCreationError,
  UserCredentialCreationError,
  UserCredentialsRepositoryPort,
  UserDeletionError,
  UserEntity,
  UserNotFoundError,
  UserRepositoryPort,
  UserUpdateError,
} from '../domain';
import { ROLE_REPOSITORY, USER_CREDENTIALS_REPOSITORY, USER_REPOSITORY } from '../users.di-tokens';

import {
  CreateRootUserCommand,
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from './commands';
import {
  FindByIdUserQuery,
  FindUsersQuery,
  FindByCredentialsUserQuery,
  FindRootUserQuery,
  FindOneUserQuery,
} from './queries';

@Injectable()
export class UsersFacade {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
    @Inject(ROLE_REPOSITORY)
    protected readonly roleRepository: RoleRepositoryPort,
    @Inject(USER_CREDENTIALS_REPOSITORY)
    protected readonly userCredentialsRepository: UserCredentialsRepositoryPort
  ) {}

  async create(command: CreateUserCommand): Promise<Result<UserEntity, UserCreationError>> {
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

  async createRootUser(
    command: CreateRootUserCommand
  ): Promise<Result<UserEntity, UserCreationError>> {
    return this.create(command);
  }

  async findById(query: FindByIdUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
    const found = await this.userRepository.findById(query.userId);

    if (found.none) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(found.unwrap());
  }

  async findPaginated(query: FindUsersQuery): Promise<Pagination<UserEntity>> {
    const { email, username, page, perPage, populate } = query;

    return this.userRepository.findAllPaginated(page, perPage, {
      where: { email, username },
      relations: populate,
    });
  }

  async findByCredentials(
    query: FindByCredentialsUserQuery
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const { identifier, password } = query;

    // find user by email or username
    const foundUser = await this.userRepository.findOneByEmailOrUsername(identifier);
    if (foundUser.none) return new Err(new UserNotFoundError());
    const user = foundUser.unwrap();

    // find user credentials
    const foundCredentials = await this.userCredentialsRepository.findOneByUserId(user.id);
    if (foundCredentials.none) return new Err(new UserNotFoundError()); // should never happen
    const { passwordHash } = foundCredentials.unwrap();

    // compare password
    const doPasswordsMatch = PasswordUtil.comparePasswordWithHash(password, passwordHash);
    if (!doPasswordsMatch) return new Err(new UserNotFoundError());

    return new Ok(user);
  }

  async findOne(query: FindOneUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
    const found = await this.userRepository.findOne(query.options);

    if (found.none) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(found.unwrap());
  }

  async findRootUser(): Promise<Result<UserEntity, UserNotFoundError>> {
    return this.findOne(new FindRootUserQuery());
  }

  async update(command: UpdateUserCommand): Promise<Result<UserEntity, UserUpdateError>> {
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

  async delete(command: DeleteUserCommand): Promise<Result<boolean, UserDeletionError>> {
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
