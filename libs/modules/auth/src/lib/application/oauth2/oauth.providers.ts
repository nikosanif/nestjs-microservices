import {
  OAUTH_CLIENT_REPOSITORY,
  OAUTH_FLOW_MODEL,
  OAUTH_SERVER,
  OAUTH_TOKEN_REPOSITORY,
  OAUTH_USER_REPOSITORY,
} from '../../auth.di-tokens';
import { AuthConfigService } from '../../config';
import {
  OAuthClientRepositoryPort,
  OAuthTokenRepositoryPort,
  OAuthUserRepositoryPort,
} from '../../domain';

import { OAuthFlowModel } from './oauth-flow.model';
import { OAuthServer } from './oauth.server';

export const oauthProviders = [
  {
    provide: OAUTH_FLOW_MODEL,
    useFactory: (
      oauthClientRepo: OAuthClientRepositoryPort,
      oAuthTokenRepo: OAuthTokenRepositoryPort,
      oauthUserRepo: OAuthUserRepositoryPort,
      authConfigService: AuthConfigService
    ) =>
      new OAuthFlowModel(
        oauthClientRepo,
        oAuthTokenRepo,
        oauthUserRepo,
        authConfigService.accessTokenSecret,
        authConfigService.refreshTokenSecret
      ),
    inject: [
      OAUTH_CLIENT_REPOSITORY,
      OAUTH_TOKEN_REPOSITORY,
      OAUTH_USER_REPOSITORY,
      AuthConfigService,
    ],
  },
  {
    provide: OAUTH_SERVER,
    useFactory: (model: OAuthFlowModel) => new OAuthServer(model),
    inject: [OAUTH_FLOW_MODEL],
  },
];
