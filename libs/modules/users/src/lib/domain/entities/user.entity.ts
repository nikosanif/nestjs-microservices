import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';

import { AbstractBaseEntity } from '@nmsvc/sdk/db';

import { UserProps } from '../types/user.types';

import { RoleEntity } from './role.entity';
import { UserCredentialsEntity } from './user-credentials.entity';

@Entity({ name: 'Users' })
export class UserEntity extends AbstractBaseEntity implements UserProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  @Index({ unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  @Index({ unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 300 })
  firstName!: string;

  @Column({ type: 'varchar', length: 300 })
  lastName!: string;

  @Column({ type: 'boolean', default: false })
  @Index({ unique: true, where: '("isRoot" = true)' }) // Only one root user
  isRoot = false;

  @ManyToOne(() => RoleEntity, role => role.users, { nullable: false })
  @JoinColumn({ name: 'roleId' })
  role!: RoleEntity;

  @Column({ type: 'uuid' })
  roleId!: string;

  @OneToOne(() => UserCredentialsEntity, credentials => credentials.user)
  credentials!: UserCredentialsEntity;
}
