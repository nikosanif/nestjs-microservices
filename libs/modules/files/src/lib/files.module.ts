import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@nmsvc/sdk/common';

import { FileHttpController, TusUploadHttpController } from './api';
import { TusService } from './application';
import { FilesConfigModule } from './config';
import { FileEntity } from './domain';
import { FILES_DB_CONNECTION_NAME, FILE_REPOSITORY } from './files.di-tokens';
import { FileRepository } from './infra';

const httpControllers = [FileHttpController, TusUploadHttpController];

const cliControllers: Provider[] = [];

const facades: Provider[] = [];

const services: Provider[] = [TusService];

const repositories: Provider[] = [{ provide: FILE_REPOSITORY, useClass: FileRepository }];

const entities = [FileEntity];

@Module({
  imports: [
    FilesConfigModule,
    TypeOrmModule.forFeature(entities, FILES_DB_CONNECTION_NAME),
    LoggerModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...services, ...facades, ...cliControllers],
})
export class FilesModule {}
