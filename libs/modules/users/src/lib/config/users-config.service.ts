import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { GlobalConfigService } from '@nmsvc/shared/config';

import { USERS_CONFIG_TOKEN, USERS_DB_CONNECTION_NAME } from '../users.di-tokens';

import { UsersConfig } from './users.config';

@Injectable()
export class UsersConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly globalConfigService: GlobalConfigService
  ) {}

  get database(): UsersConfig['database'] {
    return this.config.database;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isProd = this.globalConfigService.isProduction;

    return {
      ...this.database,
      type: 'postgres',
      synchronize: !isProd, // 👈 should NOT be used in production - otherwise you can lose production data
      autoLoadEntities: true,
      name: USERS_DB_CONNECTION_NAME,
    };
  }

  private get config(): UsersConfig {
    return this.configService.get<UsersConfig>(USERS_CONFIG_TOKEN) as UsersConfig;
  }
}
