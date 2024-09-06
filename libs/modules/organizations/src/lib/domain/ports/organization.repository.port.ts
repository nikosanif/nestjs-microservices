import { Option } from 'ts-results';

import { RepositoryPort } from '@nmsvc/sdk/db';

import { OrganizationEntity } from '../entities/organization.entity';

export interface OrganizationRepositoryPort extends RepositoryPort<OrganizationEntity> {
  findOneBySlug(slug: OrganizationEntity['slug']): Promise<Option<OrganizationEntity>>;
}
