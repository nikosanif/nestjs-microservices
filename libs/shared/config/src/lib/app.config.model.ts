export enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export interface AppConfig {
  readonly environment: EnvironmentEnum;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;

  /** The port the app should run on */
  readonly port: number;
  /** Environment type for the entire app (e.g. 'local', 'dev', 'qa', 'prod') */
  readonly ecosystemEnv: string;
}
