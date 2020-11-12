import { Route } from '@angular/router';

export function loadChildrenPostsModule(): Route {
  return {
    path: 'posts/:category:/:subcategory',
    loadChildren: async () =>
      (await import('@client/app/feature/posts/posts.module')).PostsModule,
  };
}
