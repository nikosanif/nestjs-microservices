import { EntityId } from '@nmsvc/sdk/db';
import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

export class DeleteUserCommand extends AbstractCommand {
  readonly userId!: EntityId;

  constructor(props: CommandProps<DeleteUserCommand>) {
    super(props);

    this.userId = props.userId;
  }
}
