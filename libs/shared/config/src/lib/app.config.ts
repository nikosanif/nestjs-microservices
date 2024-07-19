import { registerAs } from '@nestjs/config';

import { Validator } from '@nmsvc/sdk/utils';

import { AppConfig, EnvironmentEnum } from './app.config.model';
import { AppConfigValidator } from './app.config.validator';

export const APP_CONFIG_TOKEN = 'APP_CONFIG_TOKEN';

export const appConfigFactory = registerAs(APP_CONFIG_TOKEN, () => {
  const environment = process.env['ENVIRONMENT'] || process.env['NODE_ENV'];

  const config = {
    environment,
    isProduction: environment === EnvironmentEnum.Production,
    isDevelopment: environment === EnvironmentEnum.Development,
    isTest: environment === EnvironmentEnum.Test,

    port: parseInt(process.env['PORT'] as string, 10),
    ecosystemEnv: process.env['ECOSYSTEM_ENV'],
  } as AppConfig;

  return Validator.validateEnvVariables(config, AppConfigValidator);
});
