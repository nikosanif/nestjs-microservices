import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity } from '@nmsvc/sdk/db';

import { FileProps } from '../types/file.types';

@Entity({ name: 'Files' })
export class FileEntity extends AbstractBaseEntity implements FileProps {
  @PrimaryGeneratedColumn('uuid')
  override id!: string;

  @Column({ type: 'varchar', length: 300 })
  originalName!: string;

  @Column({ type: 'varchar', length: 300 })
  encoding!: string;

  @Column({ type: 'varchar', length: 300 })
  mimeType!: string;

  @Column({ type: 'int' })
  sizeInBytes!: number;
}
