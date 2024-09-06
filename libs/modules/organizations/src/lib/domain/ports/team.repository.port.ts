import { RepositoryPort } from '@nmsvc/sdk/db';

import { TeamEntity } from '../entities/team.entity';

export type TeamRepositoryPort = RepositoryPort<TeamEntity>;
