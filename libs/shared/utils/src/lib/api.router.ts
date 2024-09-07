export class ApiRouter {
  static globalPrefix = 'api';

  static users = {
    title: 'Users',
    root: 'users',
    userId: 'userId',
  };

  static auth = {
    title: 'Auth',
    root: 'auth',
    issueToken: 'token',
    logout: 'logout',
  };
}
