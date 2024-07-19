import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity } from '@nmsvc/sdk/db';

import { UserCredentialsProps } from '../types/user-credentials.types';

import { UserEntity } from './user.entity';

@Entity({ name: 'UserCredentials' })
export class UserCredentialsEntity extends AbstractBaseEntity implements UserCredentialsProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300 })
  passwordHash!: string;

  @OneToOne(() => UserEntity, user => user.credentials, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ type: 'uuid', unique: true })
  @Index({ unique: true })
  userId!: string;
}
