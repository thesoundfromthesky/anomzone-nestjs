import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from './type-orm-exception.filter';

export const typeOrmExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: TypeOrmExceptionFilter,
};
