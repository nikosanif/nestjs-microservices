import { Command, Console } from 'nestjs-console';

import { UseCliRequestContext } from '@nmsvc/sdk/api';
import { Logger } from '@nmsvc/sdk/common';
import { Validator } from '@nmsvc/sdk/utils';

import { CreateRoleCommand, RolesFacade } from '../application';

import { CreateRoleRequestDto } from './dto/create-role.request.dto';
import { rolesSeedData } from './seed';

@Console({
  command: 'roles',
  description: 'Roles management',
})
export class SeedRoleCliController {
  constructor(
    private readonly logger: Logger,
    private readonly rolesFacade: RolesFacade
  ) {}

  @UseCliRequestContext()
  @Command({
    command: 'seed',
    description: 'Seed roles',
  })
  async seedRoles(): Promise<void> {
    this.logger.log('Seeding roles...');

    for (const role of rolesSeedData) {
      const dto = new CreateRoleRequestDto(role);
      await Validator.validateOrFail(dto);

      const command = new CreateRoleCommand(dto);
      const { val: result, err } = await this.rolesFacade.create(command);

      if (err) {
        this.logger.error(result);
      }
    }

    this.logger.log('Roles seeded successfully ✅');
  }
}
