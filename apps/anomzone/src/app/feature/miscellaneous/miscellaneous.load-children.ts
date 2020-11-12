import { Route } from '@angular/router';

export function loadChildrenMiscellaneousModule(): Route {
  return {
    path: '**',
    loadChildren: async () =>
      (await import('@client/app/feature/miscellaneous/miscellaneous.module'))
        .MiscellaneousModule,
  };
}
