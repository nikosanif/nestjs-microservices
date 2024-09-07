import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { RoleAlreadyExistsError, RoleEntity, RoleRepositoryPort } from '../domain';
import { ROLE_REPOSITORY } from '../users.di-tokens';

import { CreateRoleCommand } from './commands';

@Injectable()
export class RolesFacade {
  constructor(
    @Inject(ROLE_REPOSITORY)
    protected readonly roleRepository: RoleRepositoryPort
  ) {}

  async create(command: CreateRoleCommand): Promise<Result<RoleEntity, RoleAlreadyExistsError>> {
    const role = this.toDomain(command);
    const result = await this.roleRepository.create(role);

    // convert the generic error to a domain error
    return result.mapErr(error => new RoleAlreadyExistsError(error));
  }

  private toDomain(command: CreateRoleCommand): RoleEntity {
    const role = new RoleEntity();
    role.slug = command.slug;
    role.name = command.name;
    role.weight = command.weight;
    role.description = command.description;

    return role;
  }
}
