import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmModuleAsyncOptions } from './config/type-orm-config';
import { ApiConfigModule } from './config';
import { pipeProviders } from './pipes';
import { interceptorProviders } from './interceptors';
import { filterProviders } from './filters';

@Module({
  imports: [
    ApiConfigModule,
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
  ],
  providers: ([] as Provider<any>[]).concat(
    pipeProviders,
    interceptorProviders,
    filterProviders
  ),
})
export class CoreModule {}
