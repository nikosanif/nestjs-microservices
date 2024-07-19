import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
  HttpException,
  InternalServerErrorException as InternalServerErrorHttpException,
  UnprocessableEntityException as UnprocessableEntityHttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RequestContextService } from '../../common';
import {
  AbstractExceptionBase,
  ApiErrorResponse,
  INTERNAL_SERVER_ERROR,
  InternalServerErrorException,
  PAYLOAD_VALIDATION_ERROR,
} from '../../exceptions';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<AbstractExceptionBase> {
    return next.handle().pipe(
      catchError(err => {
        // Checking if the error is a class-validator error
        const isClassValidatorError =
          Array.isArray(err?.response?.message) &&
          typeof err?.response?.error === 'string' &&
          err.status === HttpStatus.UNPROCESSABLE_ENTITY;

        // Transforming class-validator errors to the final format
        if (isClassValidatorError) {
          return throwError(() => this.mapClassValidatorError(err));
        }

        // Transforming HttpExceptions to the final format
        if (err instanceof HttpException) {
          return throwError(() => this.mapHttpException(err));
        }

        // Transforming generic errors to the final format
        return throwError(() => this.mapGenericError(err));
      })
    );
  }

  private mapClassValidatorError(err: any): HttpException {
    const apiError = new ApiErrorResponse({
      statusCode: err.status,
      errorCode: PAYLOAD_VALIDATION_ERROR,
      message: 'Validation error',
      error: err?.response?.error || 'Unprocessable Entity',
      correlationId: err.correlationId || RequestContextService.getRequestId(),
      subErrors: err?.response?.message || [],
    });

    return new UnprocessableEntityHttpException(apiError);
  }

  private mapHttpException(err: HttpException): HttpException {
    const statusCode = err.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    let response = err.getResponse();
    if (typeof response === 'string') {
      response = new InternalServerErrorException(response);
    }

    const exception = (response as AbstractExceptionBase)?.toJSON();

    const apiError = new ApiErrorResponse({
      statusCode,
      errorCode: exception.code,
      message: exception.message,
      error: exception.stack || exception.cause || exception.message,
      correlationId: exception.correlationId || RequestContextService.getRequestId(),
      subErrors: [],
    });

    return new HttpException(apiError, statusCode);
  }

  private mapGenericError(err: any): HttpException {
    const apiError = new ApiErrorResponse({
      statusCode: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: INTERNAL_SERVER_ERROR,
      message: InternalServerErrorException.message,
      error: err.message,
      correlationId: err.correlationId || RequestContextService.getRequestId(),
      subErrors: [this.errorToJSON(err)],
    });

    return new InternalServerErrorHttpException(apiError);
  }

  private errorToJSON(err: any): object {
    try {
      return JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    } catch (error) {
      return { message: 'An error occurred' };
    }
  }
}
