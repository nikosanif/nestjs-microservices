import { BaseEntityProps } from '@nmsvc/sdk/db';

export type OrgOwnerProps = Pick<BaseEntityProps, 'id'>;

export interface OrganizationProps extends BaseEntityProps {
  slug: string;
  name: string;
  ownerUserId: OrgOwnerProps['id'];
  description: string | null;
  location: string | null;
  website: string | null;
  email: string | null;
  phoneNumber: string | null;
}