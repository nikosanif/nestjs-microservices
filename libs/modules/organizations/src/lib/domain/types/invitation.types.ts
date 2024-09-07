import { BaseEntityProps } from '@nmsvc/sdk/db';

import { OrgMemberRoleEnum } from './membership.types';
import { OrganizationProps, UserMemberProps } from './organization.types';

export enum OrgInvitationStatusEnum {
  Pending = 'pending',
  Accepted = 'accepted',
  Declined = 'declined',
}

export interface OrgInvitationProps extends BaseEntityProps {
  email: string;
  organizationId: OrganizationProps['id'];
  invitedByUserId: UserMemberProps['id'];
  role: OrgMemberRoleEnum;
  invitedAt: Date;
  status: OrgInvitationStatusEnum;
}
