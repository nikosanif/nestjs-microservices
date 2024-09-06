import { RepositoryPort } from '@nmsvc/sdk/db';

import { UserOrgMembershipEntity } from '../entities/user-org-membership.entity';

export type UserOrgMembershipRepositoryPort = RepositoryPort<UserOrgMembershipEntity>;
