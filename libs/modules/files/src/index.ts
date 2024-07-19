import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { FilesConfigService, FilesConfigModule } from './lib/config';
import { FILES_DB_CONNECTION_NAME } from './lib/files.di-tokens';

export { FilesModule } from './lib/files.module';

export const FILES_TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
  imports: [FilesConfigModule],
  useExisting: FilesConfigService,
  name: FILES_DB_CONNECTION_NAME,
};
