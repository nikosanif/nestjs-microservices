import { RequestContext } from '../../common';

/**
 * Injects the request context into the current request.
 *
 * @param {TRequest} req
 * @param {TResponse} res
 * @param {() => void} next
 */
export function requestContextMiddleware<TRequest = any, TResponse = any>(
  req: TRequest,
  res: TResponse,
  next: () => void
) {
  RequestContext.cls.run(new RequestContext(req, res), next);
}
