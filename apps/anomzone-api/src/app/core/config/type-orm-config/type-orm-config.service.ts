import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ApiConfigService } from '../api-config.service';
import { typeOrmConfig } from '@typeorm/index';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly apiConfigService: ApiConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDev = this.apiConfigService.isDev();
    return Object.assign(typeOrmConfig, {
      // synchronize: isDev,
      // migrationsRun: isDev,
      // logging: isDev,
      // autoLoadEntities: isDev,
      keepConnectionAlive: isDev,
    });
  }
}
