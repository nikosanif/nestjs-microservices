import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { TeamMemberRoleEnum, UserTeamMembershipProps } from '../types/membership.types';

import { TeamEntity } from './team.entity';

@Entity({ name: 'UserTeamMembership' })
export class UserTeamMembershipEntity
  extends AbstractBaseEntity
  implements UserTeamMembershipProps
{
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'uuid' })
  memberUserId!: EntityId;

  @ManyToOne(() => TeamEntity, team => team.memberships, { nullable: false })
  @JoinColumn({ name: 'teamId' })
  team!: TeamEntity;

  @Column({ type: 'uuid' })
  teamId!: EntityId;

  @Column({ type: 'enum', enum: TeamMemberRoleEnum })
  role!: TeamMemberRoleEnum;

  @Column({ type: 'timestamptz' })
  joinedAt!: Date;
}
