import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrgsConfigService } from './orgs-config.service';
import { orgsConfigFactory } from './orgs.config';

@Module({
  imports: [ConfigModule.forFeature(orgsConfigFactory)],
  providers: [OrgsConfigService],
  exports: [OrgsConfigService],
})
export class OrgsConfigModule {}
