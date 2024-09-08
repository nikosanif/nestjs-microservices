import { EntityId } from '@nmsvc/sdk/db';
import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

export class DeleteOrganizationCommand extends AbstractCommand {
  readonly organizationId!: EntityId;

  constructor(props: CommandProps<DeleteOrganizationCommand>) {
    super(props);

    this.organizationId = props.organizationId;
  }
}
