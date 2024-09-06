import { RepositoryPort } from '@nmsvc/sdk/db';

import { UserTeamMembershipEntity } from '../entities/user-team-membership.entity';

export type UserTeamMembershipRepositoryPort = RepositoryPort<UserTeamMembershipEntity>;
