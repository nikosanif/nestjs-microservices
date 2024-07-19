import { AbstractExceptionBase } from './exception.base';
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from './exception.codes';

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {AbstractExceptionBase}
 */
export class ArgumentInvalidException extends AbstractExceptionBase {
  readonly code = ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {AbstractExceptionBase}
 */
export class ArgumentNotProvidedException extends AbstractExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {AbstractExceptionBase}
 */
export class ArgumentOutOfRangeException extends AbstractExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {AbstractExceptionBase}
 */
export class ConflictException extends AbstractExceptionBase {
  readonly code = CONFLICT;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {AbstractExceptionBase}
 */
export class NotFoundException extends AbstractExceptionBase {
  static readonly message = 'Not found';
  readonly code = NOT_FOUND;

  constructor(message = NotFoundException.message) {
    super(message);
  }
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {AbstractExceptionBase}
 */
export class InternalServerErrorException extends AbstractExceptionBase {
  static readonly message = 'Internal server error';
  readonly code = INTERNAL_SERVER_ERROR;

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }
}
