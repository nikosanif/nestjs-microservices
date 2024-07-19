import { Option } from 'ts-results';

import { EntityId, RepositoryPort } from '@nmsvc/sdk/db';

import { OAuthTokenEntity } from '../entities/oauth-token.entity';

export interface OAuthTokenRepositoryPort extends RepositoryPort<OAuthTokenEntity> {
  findOneByAccessToken(accessToken: string, userId: EntityId): Promise<Option<OAuthTokenEntity>>;
  findOneByRefreshToken(refreshToken: string, userId: EntityId): Promise<Option<OAuthTokenEntity>>;
  findExpiredTokens(): Promise<OAuthTokenEntity[]>;
}
