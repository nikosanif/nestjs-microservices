import { plainToClass } from 'class-transformer';
import { ValidatorOptions, validate, validateSync } from 'class-validator';

import { Logger } from '../../common';
import { ArgumentInvalidException } from '../../exceptions';
import { ConstructorLike, DeepPartial } from '../../types';

export class Validator {
  static async validateOrFail(object: object, options: ValidatorOptions = {}): Promise<void> {
    const defaultOptions: ValidatorOptions = {
      whitelist: true,
      validationError: { target: false, value: false },
    };

    const errors = await validate(object, { ...defaultOptions, ...options });

    if (errors.length) throw new ArgumentInvalidException(errors.toString());
  }

  static validateEnvVariables<TConfig extends object>(
    configuration: DeepPartial<TConfig>,
    validatorClass: ConstructorLike<TConfig>
  ): TConfig {
    const scope = validatorClass.name;
    const logger = new Logger(scope);

    const dto = plainToClass(validatorClass, configuration);

    const errors = validateSync(dto, {
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const errorMessage = `The environment variables for [${scope}] are invalid!`;
      logger.error(errorMessage);

      const message = `Please verify that the environment variables are set correctly.`;
      const errorsString = errors.map(e => e.toString(true, true)).join('');

      logger.error(message, errorsString);
      logger.debug(JSON.stringify(errors));

      // We throw a simple error instead of a custom exception
      // because exceptions has the meaning of the context of the application
      // which is not available in the first stage of environment variables validation
      throw new Error(errorMessage);
    }

    logger.log('The environment variables are valid! 🎉');

    return dto;
  }
}
