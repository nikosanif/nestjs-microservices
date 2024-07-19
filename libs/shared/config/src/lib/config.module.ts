import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { appConfigFactory } from './app.config';
import { GlobalConfigService } from './config.service';

@Module({
  imports: [NestConfigModule],
})
export class GlobalConfigModule {
  static forRoot(envFilePath?: string | string[] | undefined): DynamicModule {
    return {
      module: GlobalConfigModule,
      imports: [
        NestConfigModule.forRoot({
          envFilePath,
          load: [appConfigFactory],
          // Enable expandable variables in .env file
          // SEE: https://docs.nestjs.com/techniques/configuration#expandable-variables
          expandVariables: true,
        }),
      ],
      providers: [GlobalConfigService],
      exports: [GlobalConfigService],
      global: true,
    };
  }
}
