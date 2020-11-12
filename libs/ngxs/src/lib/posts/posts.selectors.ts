import { createSelector } from '@ngxs/store';
import { POSTS_STATE_TOKEN } from './posts-state.models';
import type { PostsStateModel } from './posts-state.models';

type RepliesSelectList = PostsStateModel['list'];
type RepliesSelectGet = PostsStateModel['get'];

export class PostsSelectors {
  static state() {
    return createSelector(
      [POSTS_STATE_TOKEN],
      (postsState: PostsStateModel): PostsStateModel => {
        return postsState;
      }
    );
  }

  static list() {
    return createSelector(
      [POSTS_STATE_TOKEN],
      (postsState: PostsStateModel): RepliesSelectList => {
        return postsState.list;
      }
    );
  }

  static get() {
    return createSelector(
      [POSTS_STATE_TOKEN],
      (postsState: PostsStateModel): RepliesSelectGet => {
        return postsState.get;
      }
    );
  }

  static pageEvent() {
    return createSelector(
      [POSTS_STATE_TOKEN],
      (postsState: PostsStateModel): PageEvent => {
        return postsState.pageEvent;
      }
    );
  }
}
