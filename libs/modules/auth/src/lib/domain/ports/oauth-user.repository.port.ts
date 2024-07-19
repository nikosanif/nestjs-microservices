import { EntityId } from '@nmsvc/sdk/db';

import { OAuthUserProps } from '../types/oauth-token.types';

export interface OAuthUserRepositoryPort<TUser extends OAuthUserProps = OAuthUserProps> {
  /**
   * Get the ID of the user.
   */
  getId(user: TUser): EntityId;

  /**
   * Find a user by ID.
   */
  findById(id: EntityId): Promise<TUser | null>;

  /**
   * Find a user by username and password.
   */
  findOneByUsernameAndPassword(username: string, password: string): Promise<TUser | null>;

  /**
   * Find the system user. This is a special user that is used for system operations.
   */
  findSystemUser(): Promise<TUser | null>;
}
