import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { FileEntity, FileRepositoryPort } from '../../domain';
import { FILES_DB_CONNECTION_NAME } from '../../files.di-tokens';

@Injectable()
export class FileRepository
  extends AbstractSqlRepository<FileEntity>
  implements FileRepositoryPort
{
  constructor(
    @InjectRepository(FileEntity, FILES_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<FileEntity>
  ) {
    super();
  }
}
