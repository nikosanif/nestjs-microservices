import { AbstractQuery, QueryProps } from '@nmsvc/sdk/ddd';
import { FindOneOptions } from '@nmsvc/sdk/types';

export class FindOneUserQuery extends AbstractQuery {
  readonly options: FindOneOptions;

  constructor(props: QueryProps<FindOneUserQuery>) {
    super(props);

    this.options = props.options || {};
  }
}

export class FindRootUserQuery extends FindOneUserQuery {
  constructor() {
    super({ options: { where: { isRoot: true } } });
  }
}
