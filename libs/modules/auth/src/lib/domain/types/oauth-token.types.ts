import {
  Token as OAuth2AccessToken,
  RefreshToken as OAuth2RefreshToken,
  User as OAuth2User,
} from '@node-oauth/oauth2-server';

import { BaseEntityProps } from '@nmsvc/sdk/db';

import { OAuthClientProps } from './oauth-client.types';

export interface OAuthUserProps extends Pick<BaseEntityProps, 'id'>, OAuth2User {}

export interface OAuthTokenProps extends BaseEntityProps, OAuth2AccessToken, OAuth2RefreshToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope: string[];
  client: OAuthClientProps;
  clientId: OAuthClientProps['id'];
  user: OAuthUserProps;
  userId: OAuthUserProps['id'];
}
