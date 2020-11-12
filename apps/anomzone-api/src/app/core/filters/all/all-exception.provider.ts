import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './all-exception.filter';

export const allExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionFilter,
};
