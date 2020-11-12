import { createSelector } from '@ngxs/store';
import { CommentsList } from '@typeorm/index';
import {
  CommentsStateModel,
  COMMENTS_STATE_TOKEN,
} from './comments-state.models';

export class CommentsSelectors {
  static state() {
    return createSelector(
      [COMMENTS_STATE_TOKEN],
      (commentsState: CommentsStateModel): CommentsStateModel => {
        return commentsState;
      }
    );
  }

  static list() {
    return createSelector(
      [COMMENTS_STATE_TOKEN],
      (commentsState: CommentsStateModel): CommentsList => {
        return commentsState.list;
      }
    );
  }

  static pageEvent() {
    return createSelector(
      [COMMENTS_STATE_TOKEN],
      (commentsState: CommentsStateModel): PageEvent => {
        return commentsState.pageEvent;
      }
    );
  }
}
