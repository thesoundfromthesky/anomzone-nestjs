import { StateToken } from '@ngxs/store';
import type { PostsList, Post } from '@typeorm/index';

export interface PostsStateModel {
  list: PostsList;
  get: Post;
  create: Post;
  update: Post;
  delete: Post;
  pageEvent: PageEvent;
}

export const POSTS_STATE_TOKEN = new StateToken<PostsStateModel>('posts');
