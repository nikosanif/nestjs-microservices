import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export enum GrpcModelNameEnum {
  Users = 'users',
}

export class GrpcUtil {
  static Package = GrpcModelNameEnum;

  static getPath(modelName: GrpcModelNameEnum) {
    // FIXME: This path should be dynamic or proto models should be in server's assets
    return join(__dirname, `../../libs/microservices/grpc/${modelName}/${modelName}.proto`);
  }

  static getClientModuleOptions(packageName: GrpcModelNameEnum): ClientProviderOptions {
    return {
      name: packageName,
      transport: Transport.GRPC,
      options: {
        package: packageName,
        protoPath: GrpcUtil.getPath(packageName),
      },
    };
  }

  static getGrpcMicroserviceOptions(packageName: GrpcModelNameEnum) {
    return {
      transport: Transport.GRPC,
      options: {
        package: packageName,
        protoPath: GrpcUtil.getPath(packageName),
      },
    };
  }
}
