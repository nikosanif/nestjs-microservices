import {
  FindManyOptions as OrmFindManyOptions,
  FindOneOptions as OrmFindOneOptions,
} from 'typeorm';

export type FindManyOptions<TEntity = any> = OrmFindManyOptions<TEntity>;
export type FindOneOptions<TEntity = any> = OrmFindOneOptions<TEntity>;
