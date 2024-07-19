import { RequestContextService } from '../common';
import { ArgumentNotProvidedException } from '../exceptions';
import { Guard, uuid } from '../utils';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<AbstractCommand>;

interface CommandMetadata {
  /**
   * ID for correlation purposes (for commands that
   * arrive from other microservices,logs correlation, etc).
   */
  readonly correlationId: string;

  /**
   * Causation id to reconstruct execution order if needed
   */
  readonly causationId?: string;

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

export abstract class AbstractCommand {
  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  readonly id: string;

  /**
   * Metadata of the command (e.g correlation id, causation id, timestamp, etc.)
   */
  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Command props should not be empty');
    }

    this.id = props.id || uuid();

    this.metadata = {
      correlationId: props?.metadata?.correlationId || RequestContextService.getRequestId(),
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
