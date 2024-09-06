import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { TypeOrmDBConfigDto, Validator } from '@nmsvc/sdk/utils';

import { ORGS_CONFIG_TOKEN } from '../organizations.di-tokens';

export interface OrgsConfig {
  readonly database: TypeOrmDBConfigDto;
}

class OrgsConfigValidator implements OrgsConfig {
  @IsNotEmptyObject()
  @Type(() => TypeOrmDBConfigDto)
  @ValidateNested()
  database!: TypeOrmDBConfigDto;
}

export const orgsConfigFactory = registerAs(ORGS_CONFIG_TOKEN, () => {
  const config: OrgsConfig = {
    database: {
      host: process.env['ORGS_DATABASE_HOST'] as string,
      port: parseInt(process.env['ORGS_DATABASE_PORT'] as string, 10),
      username: process.env['ORGS_DATABASE_USERNAME'] as string,
      password: process.env['ORGS_DATABASE_PASSWORD'] as string,
      database: process.env['ORGS_DATABASE_NAME'] as string,
    },
  };

  return Validator.validateEnvVariables(config, OrgsConfigValidator);
});
