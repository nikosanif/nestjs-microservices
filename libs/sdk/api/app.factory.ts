import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { HttpExceptionFilter } from './filters';
import { ContextInterceptor, ExceptionInterceptor } from './interceptors';
import { requestContextMiddleware } from './middlewares';
import { GlobalValidationPipe } from './pipes';

export interface ApplicationFactoryOptions {
  globalPrefix: string;
  title: string;
  description: string;
  version: string;
}

export class ApplicationFactory {
  /**
   * Create a new Nest application.
   * It wraps the `NestFactory.create` method and adds some default options (e.g. global prefix, middlewares, etc.).
   */
  static async create<T extends INestApplication = INestApplication>(
    appModule: any,
    appOptions: Partial<ApplicationFactoryOptions> = {},
    nestOptions: NestApplicationOptions = {}
  ): Promise<T> {
    const defaultOptions: ApplicationFactoryOptions = {
      globalPrefix: 'api',
      title: 'API',
      description: 'API description',
      version: '1.0',
    };

    const nestDefaultOptions: NestApplicationOptions = {
      cors: true,
      bodyParser: true,
    };

    const app = await NestFactory.create<T>(appModule, {
      ...nestDefaultOptions,
      ...nestOptions,
    });

    const options = { ...defaultOptions, ...appOptions };

    app.setGlobalPrefix(options.globalPrefix);

    // Setup global middlewares
    app.use(requestContextMiddleware);

    // Register global pipes, interceptors, and filters
    app.useGlobalPipes(new GlobalValidationPipe());
    app.useGlobalInterceptors(new ContextInterceptor(), new ExceptionInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    // Set service container for class-validator, enables DI in custom validators
    useContainer(app.select(appModule), { fallbackOnErrors: true });

    // Initialize swagger
    const docBuilderOptions = new DocumentBuilder()
      .setTitle(options.title)
      .setDescription(options.description)
      .setVersion(`v${options.version}`)
      .build();

    // Swagger UI is served at 'docs' and
    // Swagger JSON file at 'docs-json
    const document = SwaggerModule.createDocument(app, docBuilderOptions);
    SwaggerModule.setup('docs', app, document);

    return app;
  }
}
