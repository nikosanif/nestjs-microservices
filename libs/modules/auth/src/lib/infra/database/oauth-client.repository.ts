import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'ts-results';
import { Repository } from 'typeorm';

import { AbstractSqlRepository } from '@nmsvc/sdk/db';

import { AUTH_DB_CONNECTION_NAME } from '../../auth.di-tokens';
import { OAuthClientEntity, OAuthClientRepositoryPort } from '../../domain';

@Injectable()
export class OAuthClientRepository
  extends AbstractSqlRepository<OAuthClientEntity>
  implements OAuthClientRepositoryPort
{
  constructor(
    @InjectRepository(OAuthClientEntity, AUTH_DB_CONNECTION_NAME)
    protected override readonly repo: Repository<OAuthClientEntity>
  ) {
    super();
  }

  async findOneByIdAndSecret(
    clientId: string,
    clientSecret: string
  ): Promise<Option<OAuthClientEntity>> {
    return this.findOne({ where: { clientId, clientSecret } });
  }
}
