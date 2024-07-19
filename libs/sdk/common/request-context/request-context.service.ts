import { RequestContext } from './request-context.model';

export enum ClsStoreModeEnum {
  Web = 'web',
  Cli = 'cli',
}

export class AppClsStore extends RequestContext {
  mode!: ClsStoreModeEnum;
  requestId!: string;
}

export class RequestContextService {
  /**
   * Get the current context from the request.
   * If there is no context, it will return an empty object.
   */
  static getContext(): AppClsStore {
    return RequestContext.currentContext.req as AppClsStore;
  }

  /**
   * Set the mode of the request context.
   * This can be used to identify the type of request.
   */
  static setMode(mode: ClsStoreModeEnum): void {
    const ctx = this.getContext();
    ctx.mode = mode;
  }

  /**
   * Get the mode of the request context.
   * If there is no mode, it will return undefined.
   */
  static getMode(): ClsStoreModeEnum {
    return this.getContext().mode;
  }

  /**
   * Set the request ID in the request context.
   * This ID can be used as a correlation ID shown in logs.
   */
  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  /**
   * Get the request ID from the request context.
   * If there is no request ID, it will return undefined.
   */
  static getRequestId(): string {
    return this.getContext().requestId;
  }
}
