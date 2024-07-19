import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  static generatePasswordHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  static comparePasswordWithHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
