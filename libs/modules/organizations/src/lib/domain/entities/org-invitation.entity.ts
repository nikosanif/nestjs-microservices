import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { OrgInvitationProps, OrgInvitationStatusEnum } from '../types/invitation.types';
import { OrgMemberRoleEnum } from '../types/membership.types';

import { OrganizationEntity } from './organization.entity';

@Entity({ name: 'OrgInvitations' })
export class OrgInvitationEntity extends AbstractBaseEntity implements OrgInvitationProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300 })
  email!: string;

  @ManyToOne(() => OrganizationEntity, org => org.invitations, { nullable: false })
  @JoinColumn({ name: 'organizationId' })
  organization!: OrganizationEntity;

  @Column({ type: 'uuid' })
  organizationId!: EntityId;

  @Column({ type: 'uuid' })
  invitedByUserId!: EntityId;

  @Column({ type: 'enum', enum: OrgMemberRoleEnum })
  role!: OrgMemberRoleEnum;

  @Column({ type: 'timestamptz' })
  invitedAt!: Date;

  @Column({ type: 'enum', enum: OrgInvitationStatusEnum })
  status!: OrgInvitationStatusEnum;
}
