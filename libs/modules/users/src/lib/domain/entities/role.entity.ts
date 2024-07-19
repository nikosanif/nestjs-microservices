import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity } from '@nmsvc/sdk/db';

import { RoleSlugEnum, RoleProps } from '../types/role.types';

import { UserEntity } from './user.entity';

@Entity({ name: 'Roles' })
export class RoleEntity extends AbstractBaseEntity implements RoleProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'enum', enum: RoleSlugEnum, unique: true })
  @Index({ unique: true })
  slug!: RoleSlugEnum;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'int', unique: true })
  weight!: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description!: string | null;

  @OneToMany(() => UserEntity, user => user.role)
  users!: UserEntity[];
}
