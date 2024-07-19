import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { QueryHandler } from '@nmsvc/sdk/ddd';
import { PasswordUtil } from '@nmsvc/sdk/utils';

import {
  UserCredentialsRepositoryPort,
  UserEntity,
  UserNotFoundError,
  UserRepositoryPort,
} from '../../domain';
import { USER_CREDENTIALS_REPOSITORY, USER_REPOSITORY } from '../../users.di-tokens';

import { FindByCredentialsUserQuery } from './find-by-credentials-user.query';

@Injectable()
export class FindByCredentialsUserHandler
  implements QueryHandler<FindByCredentialsUserQuery, Result<UserEntity, UserNotFoundError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort,
    @Inject(USER_CREDENTIALS_REPOSITORY)
    protected readonly userCredentialsRepository: UserCredentialsRepositoryPort
  ) {}

  async execute(query: FindByCredentialsUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
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
}
