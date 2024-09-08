import { AbstractQuery, QueryProps } from '@nmsvc/sdk/ddd';

export class FindByIdOrganizationQuery extends AbstractQuery {
  readonly organizationId: string;

  constructor(props: QueryProps<FindByIdOrganizationQuery>) {
    super(props);

    this.organizationId = props.organizationId;
  }
}
