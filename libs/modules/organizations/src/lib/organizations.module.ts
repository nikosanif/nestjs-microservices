import { Module, Provider } from '@nestjs/common';
import { ClientGrpc, ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  GrpcUtil,
  USERS_GRPC_SERVICE_NAME,
  UsersGrpcServiceClient,
} from '@nmsvc/microservices/grpc';

import { OrganizationsFacade } from './application';
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
  OrgUserGrpcService,
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
  ORG_USER_REPOSITORY,
  USERS_GRPC_SERVICE,
} from './organizations.di-tokens';

const facades: Provider[] = [OrganizationsFacade];

const repositories: Provider[] = [
  { provide: ORGANIZATION_REPOSITORY, useClass: OrganizationRepository },
  { provide: TEAM_REPOSITORY, useClass: TeamRepository },
  { provide: USER_ORG_MEMBERSHIP_REPOSITORY, useClass: UserOrgMembershipRepository },
  { provide: USER_TEAM_MEMBERSHIP_REPOSITORY, useClass: UserTeamMembershipRepository },
  { provide: ORG_INVITATION_REPOSITORY, useClass: OrgInvitationRepository },
  { provide: ORG_USER_REPOSITORY, useClass: OrgUserGrpcService },
];

const entities = [
  OrgInvitationEntity,
  TeamEntity,
  OrganizationEntity,
  UserOrgMembershipEntity,
  UserTeamMembershipEntity,
];

const grpcClients: ClientsModuleOptions = [GrpcUtil.getClientModuleOptions(GrpcUtil.Package.Users)];

const grpcProviders: Provider[] = [
  {
    provide: USERS_GRPC_SERVICE,
    useFactory: (usersClient: ClientGrpc) =>
      usersClient.getService<UsersGrpcServiceClient>(USERS_GRPC_SERVICE_NAME),
    inject: [GrpcUtil.Package.Users],
  },
];

@Module({
  imports: [
    OrgsConfigModule,
    TypeOrmModule.forFeature(entities, ORGS_DB_CONNECTION_NAME),
    ClientsModule.register([...grpcClients]),
  ],
  controllers: [],
  providers: [...repositories, ...facades, ...grpcProviders],
})
export class OrganizationsModule {}
