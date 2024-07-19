import { CreateOAuthClientHandler } from './commands';

export { CreateOAuthClientCommand } from './commands';
export * from './oauth-clients.facade';

export const applicationHandlers = [CreateOAuthClientHandler];

export { OAuthFacade, oauthProviders } from './oauth2';
