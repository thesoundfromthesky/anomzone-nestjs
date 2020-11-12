import { StateToken } from '@ngxs/store';
import type { RepliesList, Reply } from '@typeorm/index';

export interface ReplyState {
  list: RepliesList;
  create: Reply;
  update: Reply;
  delete: Reply;
  pageEvent: PageEvent;
}

export type KeyReplyState = keyof ReplyState;

export interface RepliesStateModel {
  [commentId: number]: ReplyState;
}

export const REPLIES_STATE_TOKEN = new StateToken<RepliesStateModel>('replies');
