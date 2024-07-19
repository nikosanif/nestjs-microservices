import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FILES_TYPEORM_OPTIONS, FilesModule } from '@nmsvc/modules/files';
import { USERS_TYPEORM_OPTIONS, UsersModule } from '@nmsvc/modules/users';
import { GlobalConfigModule, loadEnvFiles } from '@nmsvc/shared/config';

@Module({
  imports: [
    // Load environment variables
    GlobalConfigModule.forRoot(loadEnvFiles()),

    // Register multiple database connections
    TypeOrmModule.forRootAsync(USERS_TYPEORM_OPTIONS),
    TypeOrmModule.forRootAsync(FILES_TYPEORM_OPTIONS),

    // Register main modules
    UsersModule,
    FilesModule,
  ],
})
export class AppModule {}
