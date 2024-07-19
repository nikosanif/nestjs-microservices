import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthConfigService } from './auth-config.service';
import { authConfigFactory } from './auth.config';

@Module({
  imports: [ConfigModule.forFeature(authConfigFactory)],
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
