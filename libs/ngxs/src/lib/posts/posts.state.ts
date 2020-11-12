import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { config } from '@config/index';
import type { Post, PostsList } from '@typeorm/index';
import { POSTS_STATE_TOKEN } from './posts-state.models';
import type { PostsStateModel } from './posts-state.models';
import { PostsService } from './posts.service';
import { Posts } from './posts.actions';

const initialPostsState = {
  list: [[], 0] as PostsList,
  get: {} as Post,
  create: {} as Post,
  update: {} as Post,
  delete: {} as Post,
  pageEvent: { first: 0, rows: config.query.limit, page: 0, pageCount: 0 },
};

@State<PostsStateModel>({
  name: POSTS_STATE_TOKEN,
  defaults: initialPostsState,
})
@Injectable()
export class PostsState {
  constructor(private readonly postsService: PostsService) {}

  @Action(Posts.Page, { cancelUncompleted: true })
  actionPostsPage$(
    { setState }: StateContext<PostsStateModel>,
    { pageEvent }: Posts.Page
  ) {
    setState(patch({ pageEvent }));
  }

  @Action(Posts.Create, { cancelUncompleted: true })
  actionPostsCreate$(
    { setState }: StateContext<PostsStateModel>,
    { post, url, extras }: Posts.Create
  ) {
    return this.postsService.create$(post, url, extras).pipe(
      tap((createdPost) => {
        setState(patch({ create: createdPost }));
      })
    );
  }

  @Action(Posts.List, { cancelUncompleted: true })
  actionPostsList$(
    { setState }: StateContext<PostsStateModel>,
    { url, extras }: Posts.List
  ) {
    return this.postsService.list$(url, extras).pipe(
      tap((posts) => {
        setState(patch({ list: posts }));
      })
    );
  }

  @Action(Posts.Get, { cancelUncompleted: true })
  actionPostsGet$(
    { setState }: StateContext<PostsStateModel>,
    { url, extras }: Posts.Get
  ) {
    return this.postsService.get$(url, extras).pipe(
      tap((post) => {
        setState(patch({ get: post }));
      })
    );
  }

  @Action(Posts.Update, { cancelUncompleted: true })
  actionPostsUpdate$(
    { setState }: StateContext<PostsStateModel>,
    { post, url, extras }: Posts.Update
  ) {
    return this.postsService.update$(post, url, extras).pipe(
      tap((updatedPost) => {
        setState(patch({ update: updatedPost }));
      })
    );
  }

  @Action(Posts.Delete, { cancelUncompleted: true })
  actionPostsDelete$(
    { setState }: StateContext<PostsStateModel>,
    { url, extras }: Posts.Delete
  ) {
    return this.postsService.delete$(url, extras).pipe(
      tap((reply) => {
        setState(patch({ delete: reply }));
      })
    );
  }

  @Action(Posts.Reset, { cancelUncompleted: true })
  actionPostsReset$({ setState }: StateContext<PostsStateModel>) {
    setState(initialPostsState);
  }
}
