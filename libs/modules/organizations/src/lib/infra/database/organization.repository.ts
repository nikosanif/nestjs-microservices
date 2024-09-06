import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { OrganizationEntity, OrganizationRepositoryPort } from '../../domain';
import { ORGS_DB_CONNECTION_NAME } from '../../organizations.di-tokens';

@Injectable()
export class OrganizationRepository
  extends AbstractSqlRepository<OrganizationEntity>
  implements OrganizationRepositoryPort
{
  constructor(
    @InjectRepository(OrganizationEntity, ORGS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<OrganizationEntity>
  ) {
    super();
  }

  async findOneBySlug(slug: OrganizationEntity['slug']): Promise<Option<OrganizationEntity>> {
    return this.findOne({ where: { slug } });
  }
}
