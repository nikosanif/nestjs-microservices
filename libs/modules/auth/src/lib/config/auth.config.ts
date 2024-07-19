import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, Min, ValidateNested } from 'class-validator';

import { IsStrongSecret, TypeOrmDBConfigDto, Validator } from '@nmsvc/sdk/utils';

import { AUTH_CONFIG_TOKEN } from '../auth.di-tokens';

export interface AuthConfig {
  readonly database: TypeOrmDBConfigDto;
  readonly defaultAccessTokenLifetime: number;
  readonly defaultRefreshTokenLifetime: number;
  readonly accessTokenSecret: string;
  readonly refreshTokenSecret: string;
}

class AuthConfigValidator implements AuthConfig {
  @IsNotEmptyObject()
  @Type(() => TypeOrmDBConfigDto)
  @ValidateNested()
  database!: TypeOrmDBConfigDto;

  @Min(1)
  @IsInt()
  defaultAccessTokenLifetime!: number;

  @Min(1)
  @IsInt()
  defaultRefreshTokenLifetime!: number;

  @IsStrongSecret()
  accessTokenSecret!: string;

  @IsStrongSecret()
  refreshTokenSecret!: string;
}

export const authConfigFactory = registerAs(AUTH_CONFIG_TOKEN, () => {
  const config: AuthConfig = {
    database: {
      host: process.env['AUTH_DATABASE_HOST'] as string,
      port: parseInt(process.env['AUTH_DATABASE_PORT'] as string, 10),
      username: process.env['AUTH_DATABASE_USERNAME'] as string,
      password: process.env['AUTH_DATABASE_PASSWORD'] as string,
      database: process.env['AUTH_DATABASE_NAME'] as string,
    },

    defaultAccessTokenLifetime: 60 * 60 * 24 * 1, // 1 day.
    defaultRefreshTokenLifetime: 60 * 60 * 24 * 7, // 7 days.

    accessTokenSecret: process.env['AUTH_ACCESS_TOKEN_SECRET'] as string,
    refreshTokenSecret: process.env['AUTH_REFRESH_TOKEN_SECRET'] as string,
  };

  return Validator.validateEnvVariables(config, AuthConfigValidator);
});
