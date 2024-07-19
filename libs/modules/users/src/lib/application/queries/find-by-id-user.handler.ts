import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'ts-results';

import { QueryHandler } from '@nmsvc/sdk/ddd';

import { UserEntity, UserNotFoundError, UserRepositoryPort } from '../../domain';
import { USER_REPOSITORY } from '../../users.di-tokens';

import { FindByIdUserQuery } from './find-by-id-user.query';

@Injectable()
export class FindByIdUserHandler
  implements QueryHandler<FindByIdUserQuery, Result<UserEntity, UserNotFoundError>>
{
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort
  ) {}

  async execute(query: FindByIdUserQuery): Promise<Result<UserEntity, UserNotFoundError>> {
    const found = await this.userRepository.findById(query.userId);

    if (found.none) {
      return new Err(new UserNotFoundError());
    }

    return new Ok(found.unwrap());
  }
}
