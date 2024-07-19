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
    login: 'login',
    logout: 'logout',
  };

  static files = {
    title: 'Files',
    root: 'files',
    fileId: 'fileId',
  };

  static uploads = {
    title: 'Tus file upload',
    root: 'uploads',
    rootFullPath: `/${ApiRouter.globalPrefix}/uploads`,
  };
}
