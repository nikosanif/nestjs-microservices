import { Option } from 'ts-results';

import { RepositoryPort } from '@nmsvc/sdk/db';

import { OAuthClientEntity } from '../entities/oauth-client.entity';

export interface OAuthClientRepositoryPort extends RepositoryPort<OAuthClientEntity> {
  findOneByIdAndSecret(clientId: string, clientSecret: string): Promise<Option<OAuthClientEntity>>;
}
