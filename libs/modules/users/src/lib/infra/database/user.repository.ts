import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { UserEntity, UserRepositoryPort } from '../../domain';
import { USERS_DB_CONNECTION_NAME } from '../../users.di-tokens';

@Injectable()
export class UserRepository
  extends AbstractSqlRepository<UserEntity>
  implements UserRepositoryPort
{
  constructor(
    @InjectRepository(UserEntity, USERS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<UserEntity>
  ) {
    super();
  }

  async findOneByEmail(email: string): Promise<Option<UserEntity>> {
    return this.findOne({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<Option<UserEntity>> {
    return this.findOne({ where: { username } });
  }

  async findOneByEmailOrUsername(emailOrUsername: string): Promise<Option<UserEntity>> {
    return this.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  async isRootUser(userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    return user.unwrapOr({ isRoot: false }).isRoot;
  }
}
