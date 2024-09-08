import { AbstractPaginatedQuery, QueryProps } from '@nmsvc/sdk/ddd';

export class FindOrganizationsQuery extends AbstractPaginatedQuery {
  /** Filter organizations by slug */
  readonly slug?: string;
  /** Filter organizations by owner */
  readonly ownerUserId?: string;
  /** Populate related entities */
  readonly populate?: Array<'teams' | 'memberships'>;

  constructor(props: QueryProps<Partial<FindOrganizationsQuery>>) {
    super(props);

    this.slug = props.slug;
    this.ownerUserId = props.ownerUserId;
    this.populate = props.populate;
  }
}
