import type { NodeEnv } from '@config/index';

export interface ApplicationConfig {
  port: number;
  host: string;
  globalPrefix: string;
}

export interface PostgresConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface RedisConfig {
  url: string;
}

export interface EnvironmentVariables {
  application: ApplicationConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  node_env: { mode: NodeEnv };
}
