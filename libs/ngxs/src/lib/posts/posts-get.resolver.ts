import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterService } from '@ng-util/index';
import type { Post } from '@typeorm/index';
import type { Observable } from 'rxjs';
import { PostsFacadeService } from './posts-facade.service';

@Injectable({ providedIn: 'root' })
export class PostsGetResolver implements Resolve<Post> {
  constructor(
    private readonly postsFacadeService: PostsFacadeService,
    private readonly routerService: RouterService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> | Promise<Post> | Post {
    const post = this.routerService.getState('post');

    if (post) {
      return post;
    }

    let url;
    try {
      url = this.postsFacadeService.getUrl('update');
    } catch {
      url = state.url;
    }

    return this.postsFacadeService.dispatchPostsGet$(url);
  }
}

export function resolvePostsGet() {
  return {
    resolve: { resolved: PostsGetResolver },
    // runGuardsAndResolvers: 'always' as 'always',
  };
}
