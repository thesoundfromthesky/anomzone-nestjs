import { allExceptionFilterProvider } from './all';
import { httpExceptionFilterProvider } from './http';
import { typeOrmExceptionFilterProvider } from './type-orm';

// Filter order starts from bottom to top
export const filterProviders = [
  allExceptionFilterProvider,
  httpExceptionFilterProvider,
  typeOrmExceptionFilterProvider,
];
