import { Controller } from '@nestjs/common';

import {
  UsersGrpcServiceControllerMethods,
  UsersGrpcServiceController,
  User,
  UserById,
  UserByUsernameAndPassword,
  GrpcUtil,
} from '@nmsvc/microservices/grpc';

import { FindByCredentialsUserQuery, FindByIdUserQuery, UsersFacade } from '../application';

@Controller(GrpcUtil.Package.Users)
@UsersGrpcServiceControllerMethods()
export class UserGrpcController implements UsersGrpcServiceController {
  constructor(private readonly usersFacade: UsersFacade) {}

  async findById(request: UserById): Promise<User> {
    const query = new FindByIdUserQuery({ userId: request.id });
    const maybeUser = await this.usersFacade.findById(query);
    return maybeUser.unwrap();
  }

  async findOneByUsernameAndPassword(request: UserByUsernameAndPassword): Promise<User> {
    const query = new FindByCredentialsUserQuery({
      identifier: request.username,
      password: request.password,
    });
    const maybeUser = await this.usersFacade.findByCredentials(query);
    return maybeUser.unwrap();
  }

  async findSystemUser(): Promise<User> {
    const maybeUser = await this.usersFacade.findRootUser();
    return maybeUser.unwrap();
  }
}
