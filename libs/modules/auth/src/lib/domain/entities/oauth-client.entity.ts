import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity } from '@nmsvc/sdk/db';

import { AuthClientGrantEnum, OAuthClientProps } from '../types/oauth-client.types';

import { OAuthTokenEntity } from './oauth-token.entity';

@Entity({ name: 'OAuthClients' })
@Index(['clientId', 'clientSecret'], { unique: true })
export class OAuthClientEntity extends AbstractBaseEntity implements OAuthClientProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300, array: true })
  redirectUris!: string[];

  @Column({ type: 'enum', enum: AuthClientGrantEnum, array: true })
  grants!: AuthClientGrantEnum[];

  @Column({ type: 'int' })
  accessTokenLifetime!: number;

  @Column({ type: 'int' })
  refreshTokenLifetime!: number;

  @Column({ type: 'varchar', length: 300, unique: true })
  clientId!: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  clientSecret!: string;

  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @OneToMany(() => OAuthTokenEntity, token => token.client)
  tokens!: OAuthTokenEntity[];
}
