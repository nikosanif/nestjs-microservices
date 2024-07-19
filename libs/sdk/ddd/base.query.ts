import { RequestContextService } from '../common';
import { uuid } from '../utils';

export type QueryProps<T> = Omit<T, 'id' | 'metadata'> & Partial<AbstractQuery>;

interface QueryMetadata {
  /**
   * ID for correlation purposes (for commands that
   * arrive from other microservices,logs correlation, etc).
   */
  readonly correlationId: string;

  /**
   * ID of a user who invoker the command. Can be useful for
   * logging and tracking execution of commands and events
   */
  readonly userId?: string;

  /**
   * Time when the command occurred. Mostly for tracing purposes
   */
  readonly timestamp: number;
}

export abstract class AbstractQuery {
  /**
   * Query id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  readonly id: string;

  /**
   * Metadata of the query (e.g. correlationId, timestamp)
   */
  readonly metadata: QueryMetadata;

  constructor(props: QueryProps<unknown>) {
    this.id = props.id || uuid();

    this.metadata = {
      correlationId: props?.metadata?.correlationId || RequestContextService.getRequestId(),
      userId: props?.metadata?.userId,
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }
}

/**
 * Abstract class for paginated queries (extended from AbstractQuery).
 */
export abstract class AbstractPaginatedQuery extends AbstractQuery {
  readonly page: number;
  readonly perPage: number;

  constructor(props: QueryProps<Partial<AbstractPaginatedQuery>>) {
    super(props);

    this.page = props.page || 1;
    this.perPage = props.perPage || 20;
  }
}
