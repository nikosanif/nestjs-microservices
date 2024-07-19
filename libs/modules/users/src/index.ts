import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { GrpcUtil } from '@nmsvc/microservices/grpc';

import { UsersConfigService, UsersConfigModule } from './lib/config';
import { USERS_DB_CONNECTION_NAME } from './lib/users.di-tokens';

export { UsersModule } from './lib/users.module';

export const USERS_TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
  imports: [UsersConfigModule],
  useExisting: UsersConfigService,
  name: USERS_DB_CONNECTION_NAME,
};

export const USERS_GRPC_MICROSERVICE_OPTIONS = GrpcUtil.getGrpcMicroserviceOptions(
  GrpcUtil.Package.Users
);
