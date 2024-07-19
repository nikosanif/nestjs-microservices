import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ClsStoreModeEnum, RequestContextService } from '../../common';
import { uuid } from '../../utils';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // Setting the mode in the global context for each request.
    // This mode can be used to identify the type of request
    RequestContextService.setMode(ClsStoreModeEnum.Web);

    // Setting an ID in the global context for each request.
    // This ID can be used as correlation id shown in logs
    const request = context.switchToHttp().getRequest();
    const requestId = request?.body?.requestId ?? uuid();
    RequestContextService.setRequestId(requestId);

    return next.handle();
  }
}
