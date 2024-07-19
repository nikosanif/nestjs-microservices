import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  isNotEmpty,
  minLength,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const SECRET_MIN_LENGTH = 8;
const STRONG_SECRET_MIN_LENGTH = 32;

export function isSecret(secret: string, secretMinLength = SECRET_MIN_LENGTH): boolean {
  return isString(secret) && isNotEmpty(secret) && minLength(secret, secretMinLength);
}

@ValidatorConstraint({ async: false })
class IsSecretConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const [secretMinLength] = args.constraints;
    return isSecret(value as string, secretMinLength);
  }

  defaultMessage(args: ValidationArguments) {
    const [secretMinLength] = args.constraints;
    return `Property ${args.property} must be a string with a minimum length of ${secretMinLength}.`;
  }
}

/**
 * Checks if the string is a secret with a minimum length (default 8).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsSecret(
  secretMinLength = SECRET_MIN_LENGTH,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isSecret',
      target: object.constructor,
      propertyName,
      constraints: [secretMinLength],
      options: validationOptions,
      validator: IsSecretConstraint,
    });
  };
}

/**
 * Checks if the string is a strong secret with a minimum length of 32.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsStrongSecret(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isStrongSecret',
      target: object.constructor,
      propertyName,
      constraints: [STRONG_SECRET_MIN_LENGTH],
      options: validationOptions,
      validator: IsSecretConstraint,
    });
  };
}
