import { Module, Provider } from '@nestjs/common';
import { ClientGrpc, ClientsModule, ClientsModuleOptions } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';

import {
  GrpcUtil,
  USERS_GRPC_SERVICE_NAME,
  UsersGrpcServiceClient,
} from '@nmsvc/microservices/grpc';
import { LoggerModule } from '@nmsvc/sdk/common';

import { AuthHttpController, OAuthClientCliController } from './api';
import {
  applicationHandlers,
  OAuthClientsFacade,
  OAuthFacade,
  oauthProviders,
} from './application';
import {
  AUTH_DB_CONNECTION_NAME,
  OAUTH_CLIENT_REPOSITORY,
  OAUTH_TOKEN_REPOSITORY,
  OAUTH_USER_REPOSITORY,
  USERS_GRPC_SERVICE,
} from './auth.di-tokens';
import { AuthConfigModule } from './config';
import { OAuthClientEntity, OAuthTokenEntity } from './domain';
import { OAuthClientRepository, OAuthTokenRepository, OAuthUserGrpcService } from './infra';

const httpControllers = [AuthHttpController];

const cliControllers: Provider[] = [OAuthClientCliController];

const facades: Provider[] = [OAuthClientsFacade, OAuthFacade];

const services: Provider[] = [...applicationHandlers];

const repositories: Provider[] = [
  { provide: OAUTH_CLIENT_REPOSITORY, useClass: OAuthClientRepository },
  { provide: OAUTH_TOKEN_REPOSITORY, useClass: OAuthTokenRepository },
  { provide: OAUTH_USER_REPOSITORY, useClass: OAuthUserGrpcService },
];

const entities = [OAuthClientEntity, OAuthTokenEntity];

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
    AuthConfigModule,
    TypeOrmModule.forFeature(entities, AUTH_DB_CONNECTION_NAME),
    ClientsModule.register([...grpcClients]),
    ConsoleModule,
    LoggerModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...services,
    ...facades,
    ...cliControllers,
    ...oauthProviders,
    ...grpcProviders,
  ],
})
export class AuthModule {}
