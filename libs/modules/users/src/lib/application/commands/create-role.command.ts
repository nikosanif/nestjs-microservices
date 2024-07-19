import { AbstractCommand, CommandProps } from '@nmsvc/sdk/ddd';

import { RoleSlugEnum } from '../../domain';

export class CreateRoleCommand extends AbstractCommand {
  readonly slug!: RoleSlugEnum;
  readonly name!: string;
  readonly weight!: number;
  readonly description!: string | null;

  constructor(props: CommandProps<CreateRoleCommand>) {
    super(props);

    this.slug = props.slug;
    this.name = props.name;
    this.weight = props.weight;
    this.description = props.description;
  }
}
