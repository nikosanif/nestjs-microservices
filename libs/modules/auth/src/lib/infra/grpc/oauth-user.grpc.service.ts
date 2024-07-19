import { Inject, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, of } from 'rxjs';

import { UsersGrpcServiceClient } from '@nmsvc/microservices/grpc';
import { EntityId } from '@nmsvc/sdk/db';

import { USERS_GRPC_SERVICE } from '../../auth.di-tokens';
import { OAuthUserProps, OAuthUserRepositoryPort } from '../../domain';

@Injectable()
export class OAuthUserGrpcService implements OAuthUserRepositoryPort {
  constructor(
    @Inject(USERS_GRPC_SERVICE)
    private readonly usersGrpcServiceClient: UsersGrpcServiceClient
  ) {}

  getId(user: OAuthUserProps): EntityId {
    return user.id;
  }

  async findById(id: EntityId): Promise<OAuthUserProps | null> {
    const user$ = this.usersGrpcServiceClient
      .findById({ id: id.toString() })
      .pipe(catchError(() => of(null)));

    return lastValueFrom(user$);
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<OAuthUserProps | null> {
    const user$ = this.usersGrpcServiceClient
      .findOneByUsernameAndPassword({ username, password })
      .pipe(catchError(() => of(null)));

    return lastValueFrom(user$);
  }

  async findSystemUser(): Promise<OAuthUserProps | null> {
    const user$ = this.usersGrpcServiceClient.findSystemUser({}).pipe(catchError(() => of(null)));
    return lastValueFrom(user$);
  }
}
