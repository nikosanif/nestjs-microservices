import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { QueryHandler } from '@nmsvc/sdk/ddd';

import { UserEntity, UserNotFoundError, UserRepositoryPort } from '../../domain';
import { USER_REPOSITORY } from '../../users.di-tokens';

import { FindOneUserQuery } from './find-one-user.query';

@Injectable()
export class FindOneUserHandler
  implements QueryHandler<FindOneUserQuery, Result<UserEntity, UserNotFoundError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort
  ) {}

  async execute(query: FindOneUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
    const found = await this.userRepository.findOne(query.options);

    if (found.none) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(found.unwrap());
  }
}
