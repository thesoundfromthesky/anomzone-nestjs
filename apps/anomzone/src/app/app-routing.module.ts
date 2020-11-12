import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { loadChildrenMiscellaneousModule } from '@client/app/feature/miscellaneous';
import { loadChildrenPostsModule } from '@client/app/feature/posts';
import { homeRoutes } from './home';

const routes: Routes = ([] as Routes).concat(
  homeRoutes,
  loadChildrenPostsModule(),
  loadChildrenMiscellaneousModule()
);

// options about runGuardsAndResolvers
// https://juristr.com/blog/2019/01/Explore-Angular-Routers-runGuardsAndResolvers/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash:true,
      onSameUrlNavigation: 'reload',
      // enableTracing: true,
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollOffset: [0, 140], // [x, y]
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
