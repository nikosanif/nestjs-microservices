import { RoleSlugEnum } from '../../domain';
import { CreateRoleRequestDto } from '../dto/create-role.request.dto';

export const rolesSeedData: CreateRoleRequestDto[] = [
  {
    slug: RoleSlugEnum.User,
    weight: 0,
    name: 'User',
    description: 'Simple user role',
  },
  {
    slug: RoleSlugEnum.SysAdmin,
    weight: 10,
    name: 'System administrator',
    description: 'System administrator role',
  },
];
