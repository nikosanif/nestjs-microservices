import { Option, Result } from 'ts-results';

import { ConflictException, NotFoundException } from '../exceptions';
import { DeepPartial, FindManyOptions, FindOneOptions, Pagination } from '../types';

import { EntityId } from './base.entity';

export interface RepositoryPort<TEntity> {
  /**
   * Creates a new entity in the database.
   */
  create(partialEntity: DeepPartial<TEntity>): Promise<Result<TEntity, ConflictException>>;

  /**
   * Finds an entity by its unique identifier.
   */
  findById(id: EntityId): Promise<Option<TEntity>>;

  /**
   * Finds first entity by a given find options.
   * If entity was not found in the database - returns None.
   */
  findOne(options: FindOneOptions<TEntity>): Promise<Option<TEntity>>;

  /**
   * Finds all entities in the database.
   */
  findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;

  /**
   * Finds all entities in the database paginated.
   */
  findAllPaginated(
    page: number,
    perPage: number,
    options?: FindManyOptions<TEntity>
  ): Promise<Pagination<TEntity>>;

  /**
   * Updates (partially) an entity by its unique identifier.
   */
  updateById(
    id: EntityId,
    partialEntity: DeepPartial<TEntity>
  ): Promise<Result<TEntity, NotFoundException | ConflictException>>;

  /**
   * Deletes an entity by its unique identifier.
   * Returns `true` if the entity was successfully deleted, `false` otherwise.
   */
  deleteById(id: EntityId): Promise<boolean>;

  /**
   * Deletes an entity by a given find options.
   * Returns `true` if the entity was successfully deleted, `false` otherwise.
   */
  deleteOne(options: FindOneOptions<TEntity>): Promise<boolean>;
}
