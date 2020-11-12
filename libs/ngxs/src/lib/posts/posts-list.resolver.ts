import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import type { ParamMap } from '@angular/router';
import type { PostsList } from '@typeorm/index';
import type { Observable } from 'rxjs';
import { PostsFacadeService } from './posts-facade.service';
import { config } from '@config/index';

@Injectable({ providedIn: 'root' })
export class PostsListResolver implements Resolve<PostsList> {
  constructor(private readonly postsFacadeService: PostsFacadeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PostsList> | Promise<PostsList> | PostsList {
    const page = route.queryParamMap.get('page');
    const rows = config.query.limit;
    if (page) {
      const first = (+page - 1) * rows;
      this.postsFacadeService.dispatchPostsPage$({ first, rows, page: 0 });
    } else {
      this.postsFacadeService.dispatchPostsPage$({ first: 0, rows, page: 0 });
    }

    return this.postsFacadeService.dispatchPostsList$(state.url.split('?')[0], {
      params: (route.queryParamMap as ParamMap & {
        params: Record<string, string>;
      }).params,
    });
  }
}

export function resolvePostsList() {
  return {
    resolve: { resolved: PostsListResolver },
    runGuardsAndResolvers: 'always' as const,
    // runGuardsAndResolvers: "paramsOrQueryParamsChange" as "paramsOrQueryParamsChange",
  };
}
