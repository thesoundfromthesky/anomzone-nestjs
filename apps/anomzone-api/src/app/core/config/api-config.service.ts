import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentVariables } from './config-module-option';
import { NodeEnv } from '@config/index';

@Injectable()
export class ApiConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  get<T extends keyof EnvironmentVariables>(env: T): EnvironmentVariables[T] {
    return this.configService.get<EnvironmentVariables[T]>(env);
  }

  isDev(): boolean {
    const { mode } = this.configService.get<EnvironmentVariables['node_env']>(
      'node_env'
    );

    return mode === NodeEnv.Development;
  }
}
