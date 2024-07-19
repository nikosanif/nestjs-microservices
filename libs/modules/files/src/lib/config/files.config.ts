import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { TypeOrmDBConfigDto, Validator } from '@nmsvc/sdk/utils';

import { FILES_CONFIG_TOKEN } from '../files.di-tokens';

class S3StoreConfigDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl({
    // Ref: https://github.com/validatorjs/validator.js
    require_protocol: true,
    protocols: ['http', 'https'],
    require_tld: false,
    allow_query_components: false,
    allow_fragments: false,
  })
  endpoint!: string;

  @IsNotEmpty()
  @IsString()
  bucket!: string;

  @IsBoolean()
  forcePathStyle!: boolean;

  @IsNotEmpty()
  @IsString()
  accessKeyId!: string;

  @IsNotEmpty()
  @IsString()
  secretAccessKey!: string;
}

export interface FilesConfig {
  readonly database: TypeOrmDBConfigDto;
  readonly s3Store: S3StoreConfigDto;
}

class FilesConfigValidator implements FilesConfig {
  @IsNotEmptyObject()
  @Type(() => TypeOrmDBConfigDto)
  @ValidateNested()
  database!: TypeOrmDBConfigDto;

  @IsNotEmptyObject()
  @Type(() => S3StoreConfigDto)
  @ValidateNested()
  s3Store!: S3StoreConfigDto;
}

export const filesConfigFactory = registerAs(FILES_CONFIG_TOKEN, () => {
  const config: FilesConfig = {
    database: {
      host: process.env['FILES_DATABASE_HOST'] as string,
      port: parseInt(process.env['FILES_DATABASE_PORT'] as string, 10),
      username: process.env['FILES_DATABASE_USERNAME'] as string,
      password: process.env['FILES_DATABASE_PASSWORD'] as string,
      database: process.env['FILES_DATABASE_NAME'] as string,
    },
    s3Store: {
      endpoint: process.env['FILES_S3_ENDPOINT'] as string,
      bucket: process.env['FILES_S3_BUCKET'] as string,
      forcePathStyle: process.env['FILES_S3_FORCE_PATH_STYLE'] === 'true',
      accessKeyId: process.env['FILES_S3_ACCESS_KEY_ID'] as string,
      secretAccessKey: process.env['FILES_S3_SECRET_ACCESS_KEY'] as string,
    },
  };

  return Validator.validateEnvVariables(config, FilesConfigValidator);
});
