import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { GlobalConfigService } from '@nmsvc/shared/config';

import { AUTH_CONFIG_TOKEN, AUTH_DB_CONNECTION_NAME } from '../auth.di-tokens';

import { AuthConfig } from './auth.config';

@Injectable()
export class AuthConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly globalConfigService: GlobalConfigService
  ) {}

  get database(): AuthConfig['database'] {
    return this.config.database;
  }

  get defaultAccessTokenLifetime(): AuthConfig['defaultAccessTokenLifetime'] {
    return this.config.defaultAccessTokenLifetime;
  }

  get defaultRefreshTokenLifetime(): AuthConfig['defaultRefreshTokenLifetime'] {
    return this.config.defaultRefreshTokenLifetime;
  }

  get accessTokenSecret(): AuthConfig['accessTokenSecret'] {
    return this.config.accessTokenSecret;
  }

  get refreshTokenSecret(): AuthConfig['refreshTokenSecret'] {
    return this.config.refreshTokenSecret;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isProd = this.globalConfigService.isProduction;

    return {
      ...this.database,
      type: 'postgres',
      synchronize: !isProd, // 👈 should NOT be used in production - otherwise you can lose production data
      autoLoadEntities: true,
      name: AUTH_DB_CONNECTION_NAME,
    };
  }

  private get config(): AuthConfig {
    return this.configService.get<AuthConfig>(AUTH_CONFIG_TOKEN) as AuthConfig;
  }
}
