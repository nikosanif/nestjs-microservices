import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository, EntityId } from '@nmsvc/sdk/db';

import { AUTH_DB_CONNECTION_NAME } from '../../auth.di-tokens';
import { OAuthTokenEntity, OAuthTokenRepositoryPort } from '../../domain';

@Injectable()
export class OAuthTokenRepository
  extends AbstractSqlRepository<OAuthTokenEntity>
  implements OAuthTokenRepositoryPort
{
  constructor(
    @InjectRepository(OAuthTokenEntity, AUTH_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<OAuthTokenEntity>
  ) {
    super();
  }

  async findOneByAccessToken(
    accessToken: string,
    userId: EntityId
  ): Promise<Option<OAuthTokenEntity>> {
    return this.findOne({ where: { accessToken, userId } });
  }

  async findOneByRefreshToken(
    refreshToken: string,
    userId: EntityId
  ): Promise<Option<OAuthTokenEntity>> {
    return this.findOne({ where: { refreshToken, userId } });
  }

  async findExpiredTokens(): Promise<OAuthTokenEntity[]> {
    return this.repo
      .createQueryBuilder('token')
      .where('token.accessTokenExpiresAt < NOW()')
      .andWhere('token.refreshTokenExpiresAt < NOW()')
      .getMany();
  }
}
