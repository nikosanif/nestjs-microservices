import { Option, Some, None, Result, Ok, Err } from 'ts-results';
import { QueryFailedError, Repository } from 'typeorm';

import { ConflictException, NotFoundException } from '../exceptions';
import { DeepPartial, FindManyOptions, FindOneOptions, Pagination } from '../types';

import { AbstractBaseEntity, EntityId } from './base.entity';
import { RepositoryPort } from './repository.port';

export abstract class AbstractSqlRepository<TEntity extends AbstractBaseEntity>
  implements RepositoryPort<TEntity>
{
  protected abstract readonly repo: Repository<TEntity>;

  async create(partialEntity: DeepPartial<TEntity>): Promise<Result<TEntity, ConflictException>> {
    try {
      const entity = this.repo.create(partialEntity);
      const created = await this.repo.save(entity);

      const foundCreated = await this.findById(created.id);
      return new Ok(foundCreated.unwrap());
    } catch (error) {
      return this.handleError(error, 'Record cannot be created');
    }
  }

  async findById(id: EntityId): Promise<Option<TEntity>> {
    const found = await this.repo.findOneBy({ id: id as never });
    return found ? Some(found) : None;
  }

  async findOne(options: FindOneOptions<TEntity>): Promise<Option<TEntity>> {
    const found = await this.repo.findOne(options);
    return found ? Some(found) : None;
  }

  async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    return this.repo.find(options);
  }

  async findAllPaginated(
    page: number,
    perPage: number,
    options?: FindManyOptions<TEntity>
  ): Promise<Pagination<TEntity>> {
    const [data, total] = await this.repo.findAndCount({
      ...options,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return new Pagination({ page, perPage, total, data });
  }

  async updateById(
    id: EntityId,
    partialEntity: DeepPartial<TEntity>
  ): Promise<Result<TEntity, NotFoundException | ConflictException>> {
    const found = await this.findById(id);

    if (found.none) {
      return new Err(new NotFoundException('Entity not found'));
    }

    try {
      await this.repo.save({ ...found.unwrap(), ...partialEntity });

      const foundUpdated = await this.findById(id);
      return new Ok(foundUpdated.unwrap());
    } catch (error) {
      return this.handleError(error, 'Record cannot be updated');
    }
  }

  async deleteById(id: EntityId): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result?.affected ?? 0) > 0;
  }

  async deleteOne(options: FindOneOptions<TEntity>): Promise<boolean> {
    const found = await this.findOne(options);
    if (found.none) return false;

    return this.deleteById(found.unwrap().id);
  }

  private handleError(error: unknown, message: string): Err<ConflictException> | never {
    // FIXME: Add more specific error handling
    if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
      return new Err(new ConflictException(message, error));
    }

    if (
      error instanceof QueryFailedError &&
      error.message.includes('violates not-null constraint')
    ) {
      return new Err(new ConflictException(message, error));
    }

    throw error;
  }
}
