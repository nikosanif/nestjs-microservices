import { BaseEntityProps } from '@nmsvc/sdk/db';

import { OrganizationProps } from './organization.types';
import { TeamProps } from './team.types';

export type UserMemberProps = Pick<BaseEntityProps, 'id'>;

export enum OrgMemberRoleEnum {
  OrgAdmin = 'org-admin',
  OrgMember = 'org-member',
}

export interface UserOrganizationMembershipProps extends BaseEntityProps {
  memberUserId: UserMemberProps['id'];
  organizationId: OrganizationProps['id'];
  role: OrgMemberRoleEnum;
  joinedAt: Date;
}

export enum TeamMemberRoleEnum {
  TeamAdmin = 'team-admin',
  TeamMember = 'team-member',
}

export interface UserTeamMembershipProps extends BaseEntityProps {
  memberUserId: UserMemberProps['id'];
  teamId: TeamProps['id'];
  role: TeamMemberRoleEnum;
  joinedAt: Date;
}
