import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { UserOrgMembershipEntity, UserOrgMembershipRepositoryPort } from '../../domain';
import { ORGS_DB_CONNECTION_NAME } from '../../organizations.di-tokens';

@Injectable()
export class UserOrgMembershipRepository
  extends AbstractSqlRepository<UserOrgMembershipEntity>
  implements UserOrgMembershipRepositoryPort
{
  constructor(
    @InjectRepository(UserOrgMembershipEntity, ORGS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<UserOrgMembershipEntity>
  ) {
    super();
  }
}
