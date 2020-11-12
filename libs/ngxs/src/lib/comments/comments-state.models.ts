import { StateToken } from '@ngxs/store';
import type { Comment, CommentsList } from '@typeorm/index';

export interface CommentsStateModel {
  list: CommentsList;
  create: Comment;
  update: Comment;
  delete: Comment;
  pageEvent: PageEvent;
}

export const COMMENTS_STATE_TOKEN = new StateToken<CommentsStateModel>(
  'comments'
);
