import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { OrgInvitationEntity, OrgInvitationRepositoryPort } from '../../domain';
import { ORGS_DB_CONNECTION_NAME } from '../../organizations.di-tokens';

@Injectable()
export class OrgInvitationRepository
  extends AbstractSqlRepository<OrgInvitationEntity>
  implements OrgInvitationRepositoryPort
{
  constructor(
    @InjectRepository(OrgInvitationEntity, ORGS_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<OrgInvitationEntity>
  ) {
    super();
  }
}
