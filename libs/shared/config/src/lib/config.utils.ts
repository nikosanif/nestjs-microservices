import { join } from 'node:path';

/**
 * Load environment files based on the environment.
 * It parses the environment variable `ENVIRONMENT` or `NODE_ENV` to determine which file to load.
 * If the environment is not valid, it throws an error.
 * It returns an array with the first item being the file to load and the second item being the base file.
 *
 * @example
 * ```ts
 * const [envFile, baseFile] = loadEnvFiles();
 * ```
 *
 * @param {string} [rootDirname=__dirname] - The root directory to load the environment files from.
 * @return {*}
 */
export function loadEnvFiles(rootDirname: string = __dirname) {
  const validEnvs = ['development', 'production', 'test'];

  const envFilesPaths = {
    base: join(rootDirname, './environments/.env.base'),
    development: join(rootDirname, './environments/.env.dev'),
    production: join(rootDirname, './environments/.env.prod'),
    test: join(rootDirname, './environments/.env.dev'),
  };

  const env = process.env['ENVIRONMENT'] || process.env['NODE_ENV'];
  const isValidEnv = env && validEnvs.includes(env);

  if (!isValidEnv) {
    // We throw a simple error instead of a custom exception
    // because exceptions has the meaning of the context of the application
    // which is not available in the first stage of environment variables validation
    throw new Error(`Invalid environment: ${env}. Valid environments are: ${validEnvs.join(', ')}`);
  }

  // First item in the array has higher priority
  return [envFilesPaths[env as keyof typeof envFilesPaths], envFilesPaths.base];
}
