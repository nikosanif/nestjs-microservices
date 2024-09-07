import { Inject, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, of } from 'rxjs';

import { UsersGrpcServiceClient } from '@nmsvc/microservices/grpc';
import { EntityId } from '@nmsvc/sdk/db';

import { UserMemberProps, OrgUserRepositoryPort } from '../../domain';
import { USERS_GRPC_SERVICE } from '../../organizations.di-tokens';

@Injectable()
export class OrgUserGrpcService implements OrgUserRepositoryPort {
  constructor(
    @Inject(USERS_GRPC_SERVICE)
    private readonly usersGrpcServiceClient: UsersGrpcServiceClient
  ) {}

  getId(user: UserMemberProps): EntityId {
    return user.id;
  }

  async findById(id: EntityId): Promise<UserMemberProps | null> {
    const user$ = this.usersGrpcServiceClient
      .findById({ id: id.toString() })
      .pipe(catchError(() => of(null)));

    return lastValueFrom(user$);
  }
}
