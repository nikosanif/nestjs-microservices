import { Option } from 'ts-results';

import { RepositoryPort } from '@nmsvc/sdk/db';

import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: UserEntity['email']): Promise<Option<UserEntity>>;
  findOneByUsername(username: UserEntity['username']): Promise<Option<UserEntity>>;
  findOneByEmailOrUsername(
    emailOrUsername: UserEntity['email'] | UserEntity['username']
  ): Promise<Option<UserEntity>>;
  isRootUser(userId: UserEntity['id']): Promise<boolean>;
}
