import NodeOAuthServer = require('@node-oauth/oauth2-server');
import { Request as ExpressReq } from 'express';

import { OAuthFlowModel } from './oauth-flow.model';

export class OAuthServer {
  private readonly oauthServer!: NodeOAuthServer;

  constructor(model: OAuthFlowModel) {
    this.oauthServer = new NodeOAuthServer({
      model,
      addAcceptedScopesHeader: false,
      addAuthorizedScopesHeader: false,
      allowBearerTokensInQueryString: true,
      alwaysIssueNewRefreshToken: true,
    });
  }

  /**
   * Authenticates a request.
   *
   * There are three ways to authenticate a request:
   * 1. Bearer token in headers (e.g `Authorization: Bearer XXXXX`)
   * 2. Query parameter (e.g `?access_token=XXXXX`)
   * 3. Body parameter (e.g `{ access_token=XXXXX" }`)
   *    - This requires extra headers: `Content-Type: application/x-www-form-urlencoded`
   *    - This requires extra headers: `Content-Length: XXXX`
   *
   * Steps:
   * 1. Retrieve the token
   * 2. Return token - End
   */
  async authenticate(req: ExpressReq, forScopes: string[] = []) {
    const request = this.prepareRequest(req);
    const response = this.prepareResponse();

    const scope = forScopes.length > 0 ? forScopes.join(' ') : undefined; // "undefined" means don't check for scopes

    return this.oauthServer.authenticate(request, response, {
      scope: scope as unknown as string[], // the library types are wrong, so we need to cast it
    });
  }

  /**
   * Generates a new token.
   *
   * Steps for "password" grant type:
   * 1. Retrieve the client
   * 2. Retrieve the user
   * 3. Save new token
   * 4. Return token - End
   *
   * Steps for "refresh_token" grant type:
   * 1. Retrieve the client
   * 2. Retrieve the refresh token
   * 3. Revoke previous token
   * 4. Save new token
   * 5. Return token - End
   *
   * Steps for "client_credentials" grant type:
   * 1. Retrieve the client
   * 2. Retrieve the associated user from the client
   * 3. Save new token
   * 4. Return token - End
   */
  async issueToken(req: ExpressReq) {
    const request = this.prepareRequest(req);
    const response = this.prepareResponse();

    return this.oauthServer.token(request, response);
  }

  private prepareRequest(req: ExpressReq): NodeOAuthServer.Request {
    return new NodeOAuthServer.Request(req);
  }

  private prepareResponse(): NodeOAuthServer.Response {
    return new NodeOAuthServer.Response({});
  }
}
