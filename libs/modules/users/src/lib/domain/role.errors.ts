import { AbstractExceptionBase } from '@nmsvc/sdk/exceptions';

export class RoleAlreadyExistsError extends AbstractExceptionBase {
  static readonly message = 'Role already exists';

  readonly code = 'ROLE.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(RoleAlreadyExistsError.message, cause, metadata);
  }
}

export class RoleNotFoundError extends AbstractExceptionBase {
  static readonly message = 'Role not found';

  readonly code = 'ROLE.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(RoleNotFoundError.message, cause, metadata);
  }
}
