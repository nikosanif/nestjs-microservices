import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrgsConfigModule } from './config';
import {
  OrgInvitationEntity,
  TeamEntity,
  OrganizationEntity,
  UserOrgMembershipEntity,
  UserTeamMembershipEntity,
} from './domain';
import {
  OrganizationRepository,
  OrgInvitationRepository,
  TeamRepository,
  UserOrgMembershipRepository,
  UserTeamMembershipRepository,
} from './infra';
import {
  ORGS_DB_CONNECTION_NAME,
  ORGANIZATION_REPOSITORY,
  TEAM_REPOSITORY,
  USER_ORG_MEMBERSHIP_REPOSITORY,
  USER_TEAM_MEMBERSHIP_REPOSITORY,
  ORG_INVITATION_REPOSITORY,
} from './organizations.di-tokens';

const repositories: Provider[] = [
  { provide: ORGANIZATION_REPOSITORY, useClass: OrganizationRepository },
  { provide: TEAM_REPOSITORY, useClass: TeamRepository },
  { provide: USER_ORG_MEMBERSHIP_REPOSITORY, useClass: UserOrgMembershipRepository },
  { provide: USER_TEAM_MEMBERSHIP_REPOSITORY, useClass: UserTeamMembershipRepository },
  { provide: ORG_INVITATION_REPOSITORY, useClass: OrgInvitationRepository },
];

const entities = [
  OrgInvitationEntity,
  TeamEntity,
  OrganizationEntity,
  UserOrgMembershipEntity,
  UserTeamMembershipEntity,
];

@Module({
  imports: [OrgsConfigModule, TypeOrmModule.forFeature(entities, ORGS_DB_CONNECTION_NAME)],
  controllers: [],
  providers: [...repositories],
})
export class OrganizationsModule {}
