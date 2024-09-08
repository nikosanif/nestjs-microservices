import { AbstractExceptionBase } from '@nmsvc/sdk/exceptions';

export class OrganizationAlreadyExistsError extends AbstractExceptionBase {
  static readonly message = 'Organization already exists';

  readonly code = 'ORGANIZATION.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(OrganizationAlreadyExistsError.message, cause, metadata);
  }
}

export class OrganizationNotFoundError extends AbstractExceptionBase {
  static readonly message = 'Organization not found';

  readonly code = 'ORGANIZATION.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(OrganizationNotFoundError.message, cause, metadata);
  }
}

export type OrganizationCreationError = OrganizationAlreadyExistsError;

export type OrganizationUpdateError = OrganizationNotFoundError | OrganizationAlreadyExistsError;

export type OrganizationDeletionError = OrganizationNotFoundError;
