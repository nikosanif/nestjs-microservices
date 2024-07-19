import { Option } from 'ts-results';

import { RepositoryPort } from '@nmsvc/sdk/db';

import { UserCredentialsEntity } from '../entities/user-credentials.entity';

export interface UserCredentialsRepositoryPort extends RepositoryPort<UserCredentialsEntity> {
  findOneByUserId(userId: UserCredentialsEntity['userId']): Promise<Option<UserCredentialsEntity>>;
  deleteByUserId(userId: UserCredentialsEntity['userId']): Promise<boolean>;
}
