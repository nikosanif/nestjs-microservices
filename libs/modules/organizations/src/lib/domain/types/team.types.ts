import { BaseEntityProps } from '@nmsvc/sdk/db';

import { OrganizationProps } from './organization.types';

export interface TeamProps extends BaseEntityProps {
  name: string;
  description: string | null;
  organizationId: OrganizationProps['id'];
}
