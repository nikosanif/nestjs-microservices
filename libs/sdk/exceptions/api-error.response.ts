import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
  /**
   * The HTTP status code of the error response.
   * @example 400
   */
  @ApiProperty({ example: 400 })
  readonly statusCode: number;

  /**
   * The error code of the error response.
   * @example 'PAYLOAD.VALIDATION_ERROR'
   */
  @ApiProperty({ example: 'PAYLOAD.VALIDATION_ERROR' })
  readonly errorCode: string;

  /**
   * The error message of the error response.
   * @example 'Validation error'
   */
  @ApiProperty({ example: 'Validation error' })
  readonly message: string;

  /**
   * The error of the error response.
   * @example 'Unprocessable Entity'
   */
  @ApiProperty({ example: 'Unprocessable Entity' })
  readonly error: string;

  /**
   * The correlation ID of the error response.
   * @example 'abc123-456def-789ghi-jkl012'
   */
  @ApiProperty({ example: 'abc123-456def-789ghi-jkl012' })
  readonly correlationId: string;

  /**
   * The sub-errors of the error response.
   * @example [{ property: 'email', constraints: { isEmail: 'email must be an email' }]
   */
  @ApiProperty({
    description: 'Optional list of sub-errors',
    example: [{ property: 'email', constraints: { isEmail: 'email must be an email' } }],
  })
  readonly subErrors: object[];

  constructor(body: ApiErrorResponse) {
    this.statusCode = body.statusCode;
    this.errorCode = body.errorCode;
    this.message = body.message;
    this.error = body.error;
    this.correlationId = body.correlationId;
    this.subErrors = body.subErrors;
  }
}
