import { BaseEntityProps } from '@nmsvc/sdk/db';

export enum RoleSlugEnum {
  SysAdmin = 'sys-admin',
  User = 'user',
}

export interface RoleProps extends BaseEntityProps {
  slug: RoleSlugEnum;
  name: string;
  weight: number;
  description: string | null;
}
