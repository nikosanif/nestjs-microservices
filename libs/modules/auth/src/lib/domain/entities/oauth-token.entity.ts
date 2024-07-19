import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity, EntityId } from '@nmsvc/sdk/db';

import { OAuthTokenProps, OAuthUserProps } from '../types/oauth-token.types';

import { OAuthClientEntity } from './oauth-client.entity';

@Entity({ name: 'OAuthTokens' })
export class OAuthTokenEntity extends AbstractBaseEntity implements OAuthTokenProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300 })
  accessToken!: string;

  @Column({ type: 'timestamptz' })
  accessTokenExpiresAt!: Date;

  @Column({ type: 'varchar', length: 300 })
  refreshToken!: string;

  @Column({ type: 'timestamptz' })
  refreshTokenExpiresAt!: Date;

  @Column({ type: 'varchar', length: 300, array: true })
  scope!: string[];

  @ManyToOne(() => OAuthClientEntity, client => client.tokens, { nullable: false })
  @JoinColumn({ name: 'clientId' })
  client!: OAuthClientEntity;

  @Column({ type: 'uuid' })
  clientId!: string;

  @Column({ type: 'uuid' })
  userId!: EntityId;

  // This property is not stored in the database
  user!: OAuthUserProps;
}
