import { Inject, Injectable } from '@nestjs/common';

import { QueryHandler } from '@nmsvc/sdk/ddd';
import { Pagination } from '@nmsvc/sdk/types';

import { UserEntity, UserRepositoryPort } from '../../domain';
import { USER_REPOSITORY } from '../../users.di-tokens';

import { FindUsersQuery } from './find-users.query';

@Injectable()
export class FindUsersHandler implements QueryHandler<FindUsersQuery, Pagination<UserEntity>> {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: UserRepositoryPort
  ) {}

  async execute(query: FindUsersQuery): Promise<Pagination<UserEntity>> {
    const { email, username, page, perPage, populate } = query;

    return this.userRepository.findAllPaginated(page, perPage, {
      where: { email, username },
      relations: populate,
    });
  }
}
