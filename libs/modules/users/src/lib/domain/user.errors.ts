import { AbstractExceptionBase } from '@nmsvc/sdk/exceptions';

export class UserAlreadyExistsError extends AbstractExceptionBase {
  static readonly message = 'User already exists';

  readonly code = 'USER.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}

export class UserNotFoundError extends AbstractExceptionBase {
  static readonly message = 'User not found';

  readonly code = 'USER.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotFoundError.message, cause, metadata);
  }
}

export class UserCredentialCreationError extends AbstractExceptionBase {
  static readonly message = 'User credentials cannot be created';

  readonly code = 'USER.CREDENTIALS_CREATION';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserCredentialCreationError.message, cause, metadata);
  }
}

export class RootUserIsNotEditableError extends AbstractExceptionBase {
  static readonly message = 'Root user is not editable';

  readonly code = 'USER.ROOT_USER_NOT_EDITABLE';

  constructor(cause?: Error, metadata?: unknown) {
    super(RootUserIsNotEditableError.message, cause, metadata);
  }
}

export type UserCreationError = UserAlreadyExistsError | UserCredentialCreationError;

export type UserUpdateError =
  | UserNotFoundError
  | UserAlreadyExistsError
  | RootUserIsNotEditableError;

export type UserDeletionError = UserNotFoundError | RootUserIsNotEditableError;
