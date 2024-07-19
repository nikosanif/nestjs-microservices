import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export type EntityId = string | number;

export interface BaseEntityProps {
  id: EntityId;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class AbstractBaseEntity implements BaseEntityProps {
  /**
   * The unique identifier of the entity.
   */
  abstract id: EntityId;

  /**
   * The date and time the entity was created.
   */
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  /**
   * The date and time the entity was last updated.
   */
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
