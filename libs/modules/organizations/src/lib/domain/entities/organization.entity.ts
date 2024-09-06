import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { OrganizationProps } from '../types/organization.types';

import { OrgInvitationEntity } from './org-invitation.entity';
import { TeamEntity } from './team.entity';
import { UserOrgMembershipEntity } from './user-org-membership.entity';

@Entity({ name: 'Organizations' })
export class OrganizationEntity extends AbstractBaseEntity implements OrganizationProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  @Index({ unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'uuid' })
  ownerUserId!: EntityId;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location!: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  website!: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  phoneNumber!: string | null;

  @OneToMany(() => TeamEntity, org => org.organization)
  teams!: TeamEntity[];

  @OneToMany(() => UserOrgMembershipEntity, membership => membership.organization)
  memberships!: UserOrgMembershipEntity[];

  @OneToMany(() => OrgInvitationEntity, invitation => invitation.organization)
  invitations!: OrgInvitationEntity[];
}
