import { AbstractQuery, QueryProps } from '@nmsvc/sdk/ddd';

export class FindByIdUserQuery extends AbstractQuery {
  readonly userId: string;

  constructor(props: QueryProps<FindByIdUserQuery>) {
    super(props);

    this.userId = props.userId;
  }
}
