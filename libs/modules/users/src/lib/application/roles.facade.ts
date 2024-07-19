import { Injectable } from '@nestjs/common';
import { Result } from 'ts-results';

import { RoleAlreadyExistsError, RoleEntity } from '../domain';

import { CreateRoleCommand, CreateRoleHandler } from './commands';

@Injectable()
export class RolesFacade {
  constructor(private readonly createRoleHandler: CreateRoleHandler) {}

  create(command: CreateRoleCommand): Promise<Result<RoleEntity, RoleAlreadyExistsError>> {
    return this.createRoleHandler.execute(command);
  }
}
