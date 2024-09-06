import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { GlobalConfigService } from '@nmsvc/shared/config';

import { ORGS_CONFIG_TOKEN, ORGS_DB_CONNECTION_NAME } from '../organizations.di-tokens';

import { OrgsConfig } from './orgs.config';

@Injectable()
export class OrgsConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly globalConfigService: GlobalConfigService
  ) {}

  get database(): OrgsConfig['database'] {
    return this.config.database;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isProd = this.globalConfigService.isProduction;

    return {
      ...this.database,
      type: 'postgres',
      synchronize: !isProd, // 👈 should NOT be used in production - otherwise you can lose production data
      autoLoadEntities: true,
      name: ORGS_DB_CONNECTION_NAME,
    };
  }

  private get config(): OrgsConfig {
    return this.configService.get<OrgsConfig>(ORGS_CONFIG_TOKEN) as OrgsConfig;
  }
}
