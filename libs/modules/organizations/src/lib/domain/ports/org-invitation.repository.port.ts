import { RepositoryPort } from '@nmsvc/sdk/db';

import { OrgInvitationEntity } from '../entities/org-invitation.entity';

export type OrgInvitationRepositoryPort = RepositoryPort<OrgInvitationEntity>;
