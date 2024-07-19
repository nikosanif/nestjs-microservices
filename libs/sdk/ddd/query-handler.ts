import { AbstractQuery } from './base.query';

/**
 * Query handler interface for handling queries.
 */
export interface QueryHandler<TQuery extends AbstractQuery, TResult> {
  execute(query: TQuery): Promise<TResult>;
}
