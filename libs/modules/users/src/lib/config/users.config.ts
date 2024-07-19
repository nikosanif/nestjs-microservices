import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

import { TypeOrmDBConfigDto, Validator } from '@nmsvc/sdk/utils';

import { USERS_CONFIG_TOKEN } from '../users.di-tokens';

export interface UsersConfig {
  readonly database: TypeOrmDBConfigDto;
}

class UsersConfigValidator implements UsersConfig {
  @IsNotEmptyObject()
  @Type(() => TypeOrmDBConfigDto)
  @ValidateNested()
  database!: TypeOrmDBConfigDto;
}

export const usersConfigFactory = registerAs(USERS_CONFIG_TOKEN, () => {
  const config: UsersConfig = {
    database: {
      host: process.env['USERS_DATABASE_HOST'] as string,
      port: parseInt(process.env['USERS_DATABASE_PORT'] as string, 10),
      username: process.env['USERS_DATABASE_USERNAME'] as string,
      password: process.env['USERS_DATABASE_PASSWORD'] as string,
      database: process.env['USERS_DATABASE_NAME'] as string,
    },
  };

  return Validator.validateEnvVariables(config, UsersConfigValidator);
});
