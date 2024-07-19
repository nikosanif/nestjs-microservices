import { Injectable, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
      // We override the default exception and we throw 422 instead of 400
      exceptionFactory: errors =>
        new UnprocessableEntityException(this.isDetailedOutputDisabled ? undefined : errors),
    });
  }
}
