import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { TeamEntity, TeamRepositoryPort } from '../../domain';
import { ORGS_DB_CONNECTION_NAME } from '../../organizations.di-tokens';

@Injectable()
export class TeamRepository
  extends AbstractSqlRepository<TeamEntity>
  implements TeamRepositoryPort
{
  constructor(
    @InjectRepository(TeamEntity, ORGS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<TeamEntity>
  ) {
    super();
  }
}
