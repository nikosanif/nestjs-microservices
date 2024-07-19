import { Option } from 'ts-results';

import { RepositoryPort } from '@nmsvc/sdk/db';

import { RoleEntity } from '../entities/role.entity';
import { RoleSlugEnum } from '../types/role.types';

export interface RoleRepositoryPort extends RepositoryPort<RoleEntity> {
  findOneBySlug(slug: RoleSlugEnum): Promise<Option<RoleEntity>>;
}
