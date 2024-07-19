import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { APP_CONFIG_TOKEN } from './app.config';
import { AppConfig } from './app.config.model';

@Injectable()
export class GlobalConfigService {
  constructor(private readonly configService: ConfigService) {}

  get environment(): AppConfig['environment'] {
    return this.config.environment;
  }

  get isProduction(): AppConfig['isProduction'] {
    return this.config.isProduction;
  }

  get isDevelopment(): AppConfig['isDevelopment'] {
    return this.config.isDevelopment;
  }

  get isTest(): AppConfig['isTest'] {
    return this.config.isTest;
  }

  get port(): AppConfig['port'] {
    return this.config.port;
  }

  get ecosystemEnv(): AppConfig['ecosystemEnv'] {
    return this.config.ecosystemEnv;
  }

  private get config(): AppConfig {
    return this.configService.get<AppConfig>(APP_CONFIG_TOKEN) as AppConfig;
  }
}
