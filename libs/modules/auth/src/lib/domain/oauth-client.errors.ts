import { AbstractExceptionBase } from '@nmsvc/sdk/exceptions';

export class OAuthClientAlreadyExistsError extends AbstractExceptionBase {
  static readonly message = 'OAuth client already exists';

  readonly code = 'OAUTH_CLIENT.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(OAuthClientAlreadyExistsError.message, cause, metadata);
  }
}

export class OAuthClientNotFoundError extends AbstractExceptionBase {
  static readonly message = 'OAuth client not found';

  readonly code = 'OAUTH_CLIENT.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(OAuthClientNotFoundError.message, cause, metadata);
  }
}

export type OAuthClientCreationError = OAuthClientAlreadyExistsError;
