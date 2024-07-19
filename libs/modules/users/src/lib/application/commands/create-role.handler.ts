import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { CommandHandler } from '@nmsvc/sdk/ddd';

import { RoleAlreadyExistsError, RoleEntity, RoleRepositoryPort } from '../../domain';
import { ROLE_REPOSITORY } from '../../users.di-tokens';

import { CreateRoleCommand } from './create-role.command';

@Injectable()
export class CreateRoleHandler
  implements CommandHandler<CreateRoleCommand, Result<RoleEntity, RoleAlreadyExistsError>>
{
  constructor(
    @Inject(ROLE_REPOSITORY)
    protected readonly roleRepository: RoleRepositoryPort
  ) {}

  async execute(command: CreateRoleCommand): Promise<Result<RoleEntity, RoleAlreadyExistsError>> {
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
