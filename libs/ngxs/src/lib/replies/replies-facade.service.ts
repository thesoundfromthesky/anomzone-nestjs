import { Injectable } from '@angular/core';
import { RouterService } from '@ng-util/index';
import { Store } from '@ngxs/store';
import type { Reply } from '@typeorm/index';
import { isObjectEmpty } from '@util/index';
import { switchMapTo } from 'rxjs/operators';
import { KeyReplyState } from './replies-state.models';
import { Replies } from './replies.actions';
import { RepliesSelectors } from './replies.selectors';

@Injectable({
  providedIn: 'root',
})
export class RepliesFacadeService {
  constructor(
    private readonly store: Store,
    private readonly routerService: RouterService
  ) {}

  getUrl(commentId: number, replyId?: number) {
    const url = this.routerService.getUrl();
    const urlArray = url.split('/');
    urlArray[urlArray.length - 1] = (commentId as unknown) as string;

    if (replyId) {
      urlArray.push((replyId as unknown) as string);
    }

    const regex = /(?<=^\/)posts/;
    return urlArray.join('/').replace(regex, 'replies');
  }

  selectRepliesState$(commentId: number) {
    return this.store.select(RepliesSelectors.state(commentId));
  }

  selectSnapshotRepliesState(commentId: number) {
    return this.store.selectSnapshot(RepliesSelectors.state(commentId));
  }

  selectRepliesList$(commentId: number) {
    return this.store.select(RepliesSelectors.list(commentId));
  }

  selectRepliesCreate$(commentId: number) {
    return this.store.select(RepliesSelectors.create(commentId));
  }

  selectRepliesPageEvent$(commentId: number) {
    return this.store.select(RepliesSelectors.pageEvent(commentId));
  }

  dispatchRepliesPage$(commentId: number, pageEvent: PageEvent) {
    return this.store.dispatch(new Replies.Page(commentId, pageEvent));
  }

  dispatchRepliesCreate$(
    reply: Reply,
    commentId: number,
    url?: string,
    extras?: Extras
  ) {
    return this.store.dispatch(
      new Replies.Create(
        reply,
        commentId,
        url || this.getUrl(commentId),
        extras
      )
    );
  }

  dispatchRepliesList$(commentId: number, url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Replies.List(commentId, url || this.getUrl(commentId), extras)
    );
  }

  dispatchRepliesUpdate$(
    reply: Reply,
    commentId: number,
    replyId: number,
    url?: string,
    extras?: Extras
  ) {
    return this.store.dispatch(
      new Replies.Update(
        reply,
        commentId,
        url || this.getUrl(commentId, replyId),
        extras
      )
    );
  }

  dispatchRepliesDelete$(
    commentId: number,
    replyId: number,
    url?: string,
    extras?: Extras
  ) {
    return this.store.dispatch(
      new Replies.Delete(
        commentId,
        url || this.getUrl(commentId, replyId),
        extras
      )
    );
  }

  dispatchRepliesReset$(commentId: number, method?: KeyReplyState) {
    return this.store.dispatch(new Replies.Reset(commentId, method));
  }

  initializeReplies$(commentId: number, url?: string, extras?: Extras) {
    const state = this.selectSnapshotRepliesState(commentId);

    if (state && !isObjectEmpty(state.create)) {
      return this.initializeRepliesCreate$(commentId);
    }

    return this.initializeRepliesList$(commentId, url, extras);
  }

  initializeRepliesCreate$(commentId: number) {
    return this.dispatchRepliesReset$(commentId, 'create').pipe(
      switchMapTo(this.selectRepliesList$(commentId))
    );
  }

  initializeRepliesList$(commentId: number, url?: string, extras?: Extras) {
    return this.dispatchRepliesReset$(commentId).pipe(
      switchMapTo(this.dispatchRepliesList$(commentId, url, extras)),
      switchMapTo(this.selectRepliesList$(commentId))
    );
  }
}
