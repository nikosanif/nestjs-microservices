import { Inject, Injectable } from '@nestjs/common';
import { Request as ExpressReq } from 'express';

import { OAUTH_SERVER } from '../../auth.di-tokens';

import { OAuthServer } from './oauth.server';

@Injectable()
export class OAuthFacade {
  constructor(
    @Inject(OAUTH_SERVER)
    private readonly authServer: OAuthServer
  ) {}

  async issueToken(req: ExpressReq) {
    return this.authServer.issueToken(req);
  }

  async authenticate(req: ExpressReq) {
    return this.authServer.authenticate(req);
  }

  async isAuthenticated(req: ExpressReq): Promise<boolean> {
    try {
      const token = await this.authenticate(req);
      return !!token;
    } catch (error) {
      return false;
    }
  }
}
