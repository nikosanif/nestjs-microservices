import { RepositoryPort } from '@nmsvc/sdk/db';

import { FileEntity } from '../entities/file.entity';

export type FileRepositoryPort = RepositoryPort<FileEntity>;
