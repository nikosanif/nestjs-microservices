import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { GlobalConfigService } from '@nmsvc/shared/config';

import { FILES_CONFIG_TOKEN, FILES_DB_CONNECTION_NAME } from '../files.di-tokens';

import { FilesConfig } from './files.config';

@Injectable()
export class FilesConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly globalConfigService: GlobalConfigService
  ) {}

  get database(): FilesConfig['database'] {
    return this.config.database;
  }

  get s3Store(): FilesConfig['s3Store'] {
    return this.config.s3Store;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const isProd = this.globalConfigService.isProduction;

    return {
      ...this.database,
      type: 'postgres',
      synchronize: !isProd, // 👈 should NOT be used in production - otherwise you can lose production data
      autoLoadEntities: true,
      name: FILES_DB_CONNECTION_NAME,
    };
  }

  private get config(): FilesConfig {
    return this.configService.get<FilesConfig>(FILES_CONFIG_TOKEN) as FilesConfig;
  }
}
