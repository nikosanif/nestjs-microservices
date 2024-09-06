import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { OrgsConfigModule, OrgsConfigService } from './lib/config';
import { ORGS_DB_CONNECTION_NAME } from './lib/organizations.di-tokens';

export { OrganizationsModule } from './lib/organizations.module';

export const ORGS_TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
  imports: [OrgsConfigModule],
  useExisting: OrgsConfigService,
  name: ORGS_DB_CONNECTION_NAME,
};
