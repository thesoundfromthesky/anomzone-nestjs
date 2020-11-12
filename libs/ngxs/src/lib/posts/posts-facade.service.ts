import { Injectable } from '@angular/core';
import { RouterService } from '@ng-util/index';
import { Store } from '@ngxs/store';
import type { Post } from '@typeorm/index';
import { Posts } from './posts.actions';
import { PostsSelectors } from './posts.selectors';

@Injectable({
  providedIn: 'root',
})
export class PostsFacadeService {
  constructor(
    private readonly store: Store,
    private readonly routerService: RouterService
  ) {}

  getUrl(method?: 'create' | 'update' | 'delete') {
    const url = this.routerService.getUrl();
    if (method) {
      const lookupTable = {
        create: () => {
          return /.*(?=\/write$)/;
        },
        update: () => {
          return /.*(?=\/edit$)/;
        },
        delete: () => {
          return /.*(?=\/\d+\/edit$)/;
        },
        default: () => {
          throw Error(method + ' method not allowed');
        },
      };

      const re = (lookupTable[method] || lookupTable.default)();

      const execArray = re.exec(url);
      if (!execArray) {
        throw Error('url not found');
      }
      return execArray[0];
    }
    return url;
  }

  selectPostsList$() {
    return this.store.select(PostsSelectors.list());
  }

  selectPostsGet$() {
    return this.store.select(PostsSelectors.get());
  }

  selectPostsPageEvent$() {
    return this.store.select(PostsSelectors.pageEvent());
  }

  dispatchPostsPage$(pageEvent: PageEvent) {
    return this.store.dispatch(new Posts.Page(pageEvent));
  }

  dispatchPostsCreate$(post: Post, url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Posts.Create(post, url || this.getUrl('create'), extras)
    );
  }

  dispatchPostsList$(url?: string, extras?: Extras) {
    return this.store.dispatch(new Posts.List(url || this.getUrl(), extras));
  }

  dispatchPostsGet$(url?: string, extras?: Extras) {
    return this.store.dispatch(new Posts.Get(url || this.getUrl(), extras));
  }

  dispatchPostsUpdate$(post: Post, url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Posts.Update(post, url || this.getUrl('update'), extras)
    );
  }

  dispatchPostsDelete$(url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Posts.Delete(url || this.getUrl('update'), extras)
    );
  }

  dispatchPostsReset$() {
    return this.store.dispatch(new Posts.Reset());
  }
}
