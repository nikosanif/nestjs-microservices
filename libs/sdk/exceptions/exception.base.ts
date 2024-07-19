import { RequestContextService } from '../common';

export interface SerializedException {
  message: string;
  correlationId: string;
  code: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class AbstractExceptionBase
 * @extends {Error}
 */
export abstract class AbstractExceptionBase extends Error {
  abstract code: string;

  readonly correlationId: string;

  constructor(
    override readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.correlationId = RequestContextService.getRequestId();
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      correlationId: this.correlationId,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
