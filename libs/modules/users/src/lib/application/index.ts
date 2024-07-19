import {
  CreateRoleHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
} from './commands';
import {
  FindByCredentialsUserHandler,
  FindByIdUserHandler,
  FindOneUserHandler,
  FindUsersHandler,
} from './queries';

export {
  CreateRoleCommand,
  CreateUserCommand,
  CreateRootUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
} from './commands';
export { FindByIdUserQuery, FindUsersQuery, FindByCredentialsUserQuery } from './queries';
export * from './roles.facade';
export * from './users.facade';

export const applicationHandlers = [
  CreateRoleHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  FindByIdUserHandler,
  FindUsersHandler,
  FindByCredentialsUserHandler,
  FindOneUserHandler,
];
