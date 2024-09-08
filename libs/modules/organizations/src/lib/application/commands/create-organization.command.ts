import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

import { UserMemberProps } from '../../domain';

export class CreateOrganizationCommand extends AbstractCommand {
  readonly name!: string;
  readonly ownerUserId!: UserMemberProps['id'];
  readonly description!: string | null;
  readonly location!: string | null;
  readonly website!: string | null;
  readonly email!: string | null;
  readonly phoneNumber!: string | null;

  constructor(props: Omit<CommandProps<CreateOrganizationCommand>, 'isRoot'>) {
    super(props);

    this.name = props.name;
    this.ownerUserId = props.ownerUserId;
    this.description = props.description ?? null;
    this.location = props.location ?? null;
    this.website = props.website ?? null;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
  }
}
