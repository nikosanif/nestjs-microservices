import { BaseEntityProps } from '@nmsvc/sdk/db';

export interface UserProps extends BaseEntityProps {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  isRoot: boolean;
}
