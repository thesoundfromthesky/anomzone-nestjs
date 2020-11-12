import type { ConnectionOptions } from 'typeorm';
import { ecologyEntity } from './ecology.entity';

// https://github.com/ambroiseRabier/typeorm-nestjs-migration-example
// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';

// const env: any = dotenv.parse(fs.readFileSync(`.env`));

// You can also make a singleton service that load and expose the .env file content.
// ...

// Check typeORM documentation for more information.
export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // entities: [ __dirname + '/**/*.table{.ts,.js}'],
  entities: ecologyEntity,

  synchronize: !!process.env.TYPEORM_SYNCHRONIZE,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  //   logger: 'file',

  // dropSchema: true,

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'server/migrations',
  },
};

// This error is happening because "mode" in tsconfig.json is not set to commonjs
// We are loading tsconfig.server.json when execute this file which its mode is set to commonjs.
// so ignore this error.
// export typeOrmConfig;
