import { AsyncLocalStorage } from 'node:async_hooks';

export class RequestContext<TRequest = any, TResponse = any> {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    const store = this.cls.getStore();

    if (!store) {
      return { req: {}, res: {} };
    }

    return store;
  }

  constructor(
    readonly req: TRequest,
    readonly res: TResponse
  ) {}
}
