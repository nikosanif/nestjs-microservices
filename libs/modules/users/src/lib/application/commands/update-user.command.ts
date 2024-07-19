import { EntityId } from '@nmsvc/sdk/db';
import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

export class UpdateUserCommand extends AbstractCommand {
  readonly userId!: EntityId;
  readonly userProps!: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };

  constructor(props: CommandProps<UpdateUserCommand>) {
    super(props);

    this.userId = props.userId;
    this.userProps = {
      email: props.userProps.email,
      firstName: props.userProps.firstName,
      lastName: props.userProps.lastName,
    };
  }
}
