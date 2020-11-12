import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import * as Joi from 'joi';

import { load } from './load';
import { NodeEnv } from '@config/index';

const validationSchema = Joi.object({
  ['NODE' + '_ENV']: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  APPLICATION_GLOBAL_PREFIX: Joi.string().required(),
  APPLICATION_HOST: Joi.string().required(),
  APPLICATION_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
});

// const validationOptions = {
//   allowUnknown: false,
//   abortEarly: true,
// };
console.log();
export const configModuleOptions: ConfigModuleOptions = {
  load,
  validationSchema,
  // validationOptions
  //, isGlobal: true,
  envFilePath: [`.env.${process.env['NODE' + '_ENV']}`],
  ignoreEnvFile: true,
  expandVariables: true,
};
