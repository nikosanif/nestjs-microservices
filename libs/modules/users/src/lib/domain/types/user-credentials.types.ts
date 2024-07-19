import { BaseEntityProps } from '@nmsvc/sdk/db';

export interface UserCredentialsProps extends BaseEntityProps {
  passwordHash: string;
  userId: string;
}
