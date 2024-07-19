import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersConfigService } from './users-config.service';
import { usersConfigFactory } from './users.config';

@Module({
  imports: [ConfigModule.forFeature(usersConfigFactory)],
  providers: [UsersConfigService],
  exports: [UsersConfigService],
})
export class UsersConfigModule {}
