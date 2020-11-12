import { createSelector } from '@ngxs/store';
import { REPLIES_STATE_TOKEN } from './replies-state.models';
import type { RepliesStateModel, ReplyState } from './replies-state.models';

export type RepliesSelectList = RepliesStateModel[number]['list'];
export type RepliesSelectCreate = RepliesStateModel[number]['create'];

export class RepliesSelectors {
  static state(commentId: number) {
    return createSelector(
      [REPLIES_STATE_TOKEN],
      (repliesState: RepliesStateModel): ReplyState => {
        return repliesState[commentId];
      }
    );
  }

  static list(commentId: number) {
    return createSelector(
      [REPLIES_STATE_TOKEN],
      (repliesState: RepliesStateModel): RepliesSelectList => {
        return repliesState[commentId]?.list;
      }
    );
  }

  static create(commentId: number) {
    return createSelector(
      [REPLIES_STATE_TOKEN],
      (repliesState: RepliesStateModel): RepliesSelectCreate => {
        return repliesState[commentId]?.create;
      }
    );
  }

  static pageEvent(commentId: number) {
    return createSelector(
      [REPLIES_STATE_TOKEN],
      (repliesState: RepliesStateModel): PageEvent => {
        return repliesState[commentId]?.pageEvent;
      }
    );
  }
}
