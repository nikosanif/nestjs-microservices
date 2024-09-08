import { AbstractQuery, QueryProps } from '@nmsvc/sdk/ddd';
import { FindOneOptions } from '@nmsvc/sdk/types';

export class FindOneOrganizationQuery extends AbstractQuery {
  readonly options: FindOneOptions;

  constructor(props: QueryProps<FindOneOrganizationQuery>) {
    super(props);

    this.options = props.options || {};
  }
}

export class FindBySlugOrganizationQuery extends FindOneOrganizationQuery {
  constructor(slug: string) {
    super({ options: { where: { slug } } });
  }
}
