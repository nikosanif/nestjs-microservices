import { AbstractQuery, QueryProps } from '@nmsvc/sdk/ddd';

export class FindByCredentialsUserQuery extends AbstractQuery {
  /** A user can be identified by username or email */
  readonly identifier: string;
  readonly password: string;

  constructor(props: QueryProps<FindByCredentialsUserQuery>) {
    super(props);

    this.identifier = props.identifier;
    this.password = props.password;
  }
}
