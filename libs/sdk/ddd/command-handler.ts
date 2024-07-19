import { AbstractCommand } from './base.command';

/**
 * Command handler interface for handling commands.
 */
export interface CommandHandler<TCommand extends AbstractCommand, TResult = unknown> {
  execute(command: TCommand): Promise<TResult>;
}
