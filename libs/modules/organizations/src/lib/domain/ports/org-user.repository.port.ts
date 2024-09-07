import { EntityId } from '@nmsvc/sdk/db';

import { UserMemberProps } from '../types/organization.types';

export interface OrgUserRepositoryPort<TUser extends UserMemberProps = UserMemberProps> {
  /**
   * Get the ID of the user.
   */
  getId(user: TUser): EntityId;

  /**
   * Find a user by ID.
   */
  findById(id: EntityId): Promise<TUser | null>;
}
