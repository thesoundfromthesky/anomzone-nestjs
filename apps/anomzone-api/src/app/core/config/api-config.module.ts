import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config-module-option';
import { ApiConfigService } from './api-config.service';
import { ApiConfigController } from './api-config.controller';

const apiConfigProviders = [ApiConfigService];

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: ([] as Provider<any>[]).concat(apiConfigProviders),
  providers: ([] as Provider<any>[]).concat(apiConfigProviders),
  controllers: [ApiConfigController],
})
export class ApiConfigModule {}
