import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { UserTeamMembershipEntity, UserTeamMembershipRepositoryPort } from '../../domain';
import { ORGS_DB_CONNECTION_NAME } from '../../organizations.di-tokens';

@Injectable()
export class UserTeamMembershipRepository
  extends AbstractSqlRepository<UserTeamMembershipEntity>
  implements UserTeamMembershipRepositoryPort
{
  constructor(
    @InjectRepository(UserTeamMembershipEntity, ORGS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<UserTeamMembershipEntity>
  ) {
    super();
  }
}
