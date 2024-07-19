import { AbstractPaginatedQuery, QueryProps } from '@nmsvc/sdk/ddd';

export class FindUsersQuery extends AbstractPaginatedQuery {
  /** Filter users by email */
  readonly email?: string;
  /** Filter users by username */
  readonly username?: string;
  /** Populate related entities */
  readonly populate?: Array<'role'>;

  constructor(props: QueryProps<Partial<FindUsersQuery>>) {
    super(props);

    this.email = props.email;
    this.username = props.username;
    this.populate = props.populate;
  }
}
