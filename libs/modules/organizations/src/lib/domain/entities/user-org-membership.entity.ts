import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { OrgMemberRoleEnum, UserOrganizationMembershipProps } from '../types/membership.types';

import { OrganizationEntity } from './organization.entity';

@Entity({ name: 'UserOrgMembership' })
export class UserOrgMembershipEntity
  extends AbstractBaseEntity
  implements UserOrganizationMembershipProps
{
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'uuid' })
  memberUserId!: EntityId;

  @ManyToOne(() => OrganizationEntity, org => org.memberships, { nullable: false })
  @JoinColumn({ name: 'organizationId' })
  organization!: OrganizationEntity;

  @Column({ type: 'uuid' })
  organizationId!: EntityId;

  @Column({ type: 'enum', enum: OrgMemberRoleEnum })
  role!: OrgMemberRoleEnum;

  @Column({ type: 'timestamptz' })
  joinedAt!: Date;
}
