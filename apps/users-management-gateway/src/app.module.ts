import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule, AUTH_TYPEORM_OPTIONS } from '@nmsvc/modules/auth';
import { OrganizationsModule, ORGS_TYPEORM_OPTIONS } from '@nmsvc/modules/organizations';
import { USERS_TYPEORM_OPTIONS, UsersModule } from '@nmsvc/modules/users';
import { GlobalConfigModule, loadEnvFiles } from '@nmsvc/shared/config';

@Module({
  imports: [
    // Load environment variables
    GlobalConfigModule.forRoot(loadEnvFiles()),

    // Register multiple database connections
    TypeOrmModule.forRootAsync(USERS_TYPEORM_OPTIONS),
    TypeOrmModule.forRootAsync(AUTH_TYPEORM_OPTIONS),
    TypeOrmModule.forRootAsync(ORGS_TYPEORM_OPTIONS),

    // Register main modules
    UsersModule,
    AuthModule,
    OrganizationsModule,
  ],
})
export class AppModule {}
