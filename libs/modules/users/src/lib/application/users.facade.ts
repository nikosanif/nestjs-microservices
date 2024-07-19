import { Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { Pagination } from '@nmsvc/sdk/types';

import {
  UserCreationError,
  UserDeletionError,
  UserEntity,
  UserNotFoundError,
  UserUpdateError,
} from '../domain';

import {
  CreateRootUserCommand,
  CreateUserCommand,
  CreateUserHandler,
  DeleteUserCommand,
  DeleteUserHandler,
  UpdateUserCommand,
  UpdateUserHandler,
} from './commands';
import {
  FindByIdUserQuery,
  FindByIdUserHandler,
  FindUsersHandler,
  FindUsersQuery,
  FindByCredentialsUserQuery,
  FindByCredentialsUserHandler,
  FindOneUserHandler,
  FindRootUserQuery,
} from './queries';

@Injectable()
export class UsersFacade {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly deleteUserHandler: DeleteUserHandler,
    private readonly findByCredentialsUserHandler: FindByCredentialsUserHandler,
    private readonly findByIdUserHandler: FindByIdUserHandler,
    private readonly findOneUserHandler: FindOneUserHandler,
    private readonly findUsersHandler: FindUsersHandler,
    private readonly updateUserHandler: UpdateUserHandler
  ) {}

  async createRootUser(
    command: CreateRootUserCommand
  ): Promise<Result<UserEntity, UserCreationError>> {
    return this.createUserHandler.execute(command);
  }

  async findRootUser(): Promise<Result<UserEntity, UserNotFoundError>> {
    return this.findOneUserHandler.execute(new FindRootUserQuery());
  }

  async create(command: CreateUserCommand): Promise<Result<UserEntity, UserCreationError>> {
    return this.createUserHandler.execute(command);
  }

  async findById(query: FindByIdUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
    return this.findByIdUserHandler.execute(query);
  }

  async findPaginated(query: FindUsersQuery): Promise<Pagination<UserEntity>> {
    return this.findUsersHandler.execute(query);
  }

  async findByCredentials(
    query: FindByCredentialsUserQuery
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    return this.findByCredentialsUserHandler.execute(query);
  }

  async update(command: UpdateUserCommand): Promise<Result<UserEntity, UserUpdateError>> {
    return this.updateUserHandler.execute(command);
  }

  async delete(command: DeleteUserCommand): Promise<Result<boolean, UserDeletionError>> {
    return this.deleteUserHandler.execute(command);
  }
}
