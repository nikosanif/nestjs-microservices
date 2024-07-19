import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule, AUTH_TYPEORM_OPTIONS } from '@nmsvc/modules/auth';
import { GlobalConfigModule, loadEnvFiles } from '@nmsvc/shared/config';

@Module({
  imports: [
    // Load environment variables
    GlobalConfigModule.forRoot(loadEnvFiles()),

    // Register multiple database connections
    TypeOrmModule.forRootAsync(AUTH_TYPEORM_OPTIONS),

    // Register main modules
    AuthModule,
  ],
})
export class AppModule {}
