import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { AppConfig, EnvironmentEnum } from './app.config.model';

export class AppConfigValidator implements AppConfig {
  @IsEnum(EnvironmentEnum)
  environment!: EnvironmentEnum;

  @IsBoolean()
  isProduction!: boolean;

  @IsBoolean()
  isDevelopment!: boolean;

  @IsBoolean()
  isTest!: boolean;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(65535)
  port!: number;

  @IsNotEmpty()
  @IsString()
  ecosystemEnv!: string;
}
