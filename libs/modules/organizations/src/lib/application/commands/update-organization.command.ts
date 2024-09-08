import { EntityId } from '@nmsvc/sdk/db';
import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

export class UpdateOrganizationCommand extends AbstractCommand {
  readonly organizationId!: EntityId;
  readonly orgProps!: {
    name?: string;
    description?: string | null;
    location?: string | null;
    website?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
  };

  constructor(props: CommandProps<UpdateOrganizationCommand>) {
    super(props);

    this.organizationId = props.organizationId;
    this.orgProps = {
      name: props.orgProps.name,
      description: props.orgProps.description ?? null,
      location: props.orgProps.location ?? null,
      website: props.orgProps.website ?? null,
      email: props.orgProps.email ?? null,
      phoneNumber: props.orgProps.phoneNumber ?? null,
    };
  }
}
