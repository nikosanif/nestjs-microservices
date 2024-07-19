import { Logger } from '@nestjs/common';

import { ApplicationFactory } from '@nmsvc/sdk/api';
import { GlobalConfigService } from '@nmsvc/shared/config';
import { ApiRouter } from '@nmsvc/shared/utils';

import { AppModule } from './app.module';

async function bootstrap() {
  const globalPrefix = ApiRouter.globalPrefix;

  const app = await ApplicationFactory.create(AppModule, {
    globalPrefix,
    title: 'Wolverine API',
    description: 'Wolverine API description',
    version: '1.0',
  });

  const configService = app.get(GlobalConfigService);
  const port = configService.port;
  const environment = configService.environment;
  const ecosystemEnv = configService.ecosystemEnv;

  await app.listen(port);

  Logger.log(`📂 Full path: ${__dirname}`);
  Logger.log(`🌍 Environment: ${ecosystemEnv}:${environment}`);
  Logger.log(`📈 Swagger API docs: http://localhost:${port}/docs`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
