import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { TeamProps } from '../types/team.types';

import { OrganizationEntity } from './organization.entity';
import { UserTeamMembershipEntity } from './user-team-membership.entity';

@Entity({ name: 'Teams' })
export class TeamEntity extends AbstractBaseEntity implements TeamProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description!: string | null;

  @ManyToOne(() => OrganizationEntity, org => org.teams, { nullable: false })
  @JoinColumn({ name: 'organizationId' })
  organization!: OrganizationEntity;

  @Column({ type: 'uuid' })
  organizationId!: EntityId;

  @OneToMany(() => UserTeamMembershipEntity, membership => membership.team)
  memberships!: UserTeamMembershipEntity[];
}
