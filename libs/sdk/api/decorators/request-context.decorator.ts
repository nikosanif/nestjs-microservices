import { RequestContext, ClsStoreModeEnum, RequestContextService } from '../../common';
import { uuid } from '../../utils';

/**
 * Copies all metadata from one object to another.
 * Useful for overwriting function definition in
 * decorators while keeping all previously
 * attached metadata
 *
 * @param from object to copy metadata from
 * @param to object to copy metadata to
 */
function copyMethodMetadata(from: any, to: any) {
  const metadataKeys = Reflect.getMetadataKeys(from);
  metadataKeys.map(key => {
    const value = Reflect.getMetadata(key, from);
    Reflect.defineMetadata(key, value, to);
  });
}

/**
 * Decorator to be used on CLI commands to set the request context for each command.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function UseCliRequestContext<TArgs extends any[]>() {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: TArgs) => Promise<any>>
  ) => {
    const original = descriptor.value;

    // Check if the decorator is used on a function
    if (typeof original !== 'function') {
      throw new Error(
        `The @UseCliRequestContext decorator can be only used on functions, but ${propertyKey.toString()} is not a function.`
      );
    }

    descriptor.value = function (...args: TArgs) {
      return RequestContext.cls.run(new RequestContext({}, {}), async () => {
        // Setting the mode in the global context for each request.
        // This mode can be used to identify the type of request
        RequestContextService.setMode(ClsStoreModeEnum.Cli);

        // Setting an ID in the global context for each request.
        // This ID can be used as correlation id shown in logs
        RequestContextService.setRequestId(uuid());

        return original.apply(this, args);
      });
    };

    copyMethodMetadata(original, descriptor.value);
  };
}
