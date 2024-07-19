import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { RoleSlugEnum, RoleEntity, RoleRepositoryPort } from '../../domain';
import { USERS_DB_CONNECTION_NAME } from '../../users.di-tokens';

@Injectable()
export class RoleRepository
  extends AbstractSqlRepository<RoleEntity>
  implements RoleRepositoryPort
{
  constructor(
    @InjectRepository(RoleEntity, USERS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<RoleEntity>
  ) {
    super();
  }

  async findOneBySlug(slug: RoleSlugEnum): Promise<Option<RoleEntity>> {
    return this.findOne({ where: { slug } });
  }
}
