import { registerAs } from '@nestjs/config';

const NodeEnv = registerAs('node_env', () => ({
  mode: process.env['NODE' + '_ENV'],
}));

const Application = registerAs('application', () => ({
  host: process.env.APPLICATION_HOST,
  port: parseInt(process.env.APPLICATION_PORT, 10),
  globalPrefix: process.env.APPLICATION_GLOBAL_PREFIX,
}));

const Postgres = registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
}));

const Redis = registerAs('redis', () => ({
  url: process.env.REDIS_URL,
}));

export const load = [NodeEnv, Application, Postgres, Redis];
