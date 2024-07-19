import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesConfigService } from './files-config.service';
import { filesConfigFactory } from './files.config';

@Module({
  imports: [ConfigModule.forFeature(filesConfigFactory)],
  providers: [FilesConfigService],
  exports: [FilesConfigService],
})
export class FilesConfigModule {}
