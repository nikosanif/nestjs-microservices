import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';

import { LoggerModule } from '@nmsvc/sdk/common';

import {
  UserHttpController,
  UserCliController,
  SeedRoleCliController,
  UserGrpcController,
} from './api';
import { UsersFacade, RolesFacade } from './application';
import { UsersConfigModule } from './config';
import { RoleEntity, UserEntity, UserCredentialsEntity } from './domain';
import { RoleRepository, UserRepository, UserCredentialsRepository } from './infra';
import {
  USERS_DB_CONNECTION_NAME,
  ROLE_REPOSITORY,
  USER_CREDENTIALS_REPOSITORY,
  USER_REPOSITORY,
} from './users.di-tokens';

const httpControllers = [UserHttpController];

const grpcControllers = [UserGrpcController];

const cliControllers: Provider[] = [UserCliController, SeedRoleCliController];

const facades: Provider[] = [UsersFacade, RolesFacade];

const repositories: Provider[] = [
  { provide: ROLE_REPOSITORY, useClass: RoleRepository },
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: USER_CREDENTIALS_REPOSITORY, useClass: UserCredentialsRepository },
];

const entities = [RoleEntity, UserEntity, UserCredentialsEntity];

@Module({
  imports: [
    UsersConfigModule,
    TypeOrmModule.forFeature(entities, USERS_DB_CONNECTION_NAME),
    ConsoleModule,
    LoggerModule,
  ],
  controllers: [...httpControllers, ...grpcControllers],
  providers: [...repositories, ...facades, ...cliControllers],
})
export class UsersModule {}
