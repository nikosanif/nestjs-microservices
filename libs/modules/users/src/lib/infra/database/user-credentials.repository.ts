import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { UserCredentialsEntity, UserCredentialsRepositoryPort } from '../../domain';
import { USERS_DB_CONNECTION_NAME } from '../../users.di-tokens';

@Injectable()
export class UserCredentialsRepository
  extends AbstractSqlRepository<UserCredentialsEntity>
  implements UserCredentialsRepositoryPort
{
  constructor(
    @InjectRepository(UserCredentialsEntity, USERS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<UserCredentialsEntity>
  ) {
    super();
  }

  async findOneByUserId(
    userId: UserCredentialsEntity['userId']
  ): Promise<Option<UserCredentialsEntity>> {
    return this.findOne({ where: { userId } });
  }

  async deleteByUserId(userId: UserCredentialsEntity['userId']): Promise<boolean> {
    return this.deleteOne({ where: { userId } });
  }
}
