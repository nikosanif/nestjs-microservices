import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AUTH_DB_CONNECTION_NAME } from './lib/auth.di-tokens';
import { AuthConfigModule, AuthConfigService } from './lib/config';

export { AuthModule } from './lib/auth.module';

export const AUTH_TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
  imports: [AuthConfigModule],
  useExisting: AuthConfigService,
  name: AUTH_DB_CONNECTION_NAME,
};
