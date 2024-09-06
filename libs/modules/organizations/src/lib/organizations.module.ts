import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  OrgInvitationEntity,
  TeamEntity,
  OrganizationEntity,
  UserOrgMembershipEntity,
  UserTeamMembershipEntity,
} from './domain';
import { ORGS_DB_CONNECTION_NAME } from './organizations.di-tokens';

const entities = [
  OrgInvitationEntity,
  TeamEntity,
  OrganizationEntity,
  UserOrgMembershipEntity,
  UserTeamMembershipEntity,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities, ORGS_DB_CONNECTION_NAME)],
  controllers: [],
  providers: [],
  exports: [],
})
export class OrganizationsModule {}
