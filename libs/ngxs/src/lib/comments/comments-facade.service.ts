import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Comments } from './comments.actions';
import { CommentsSelectors } from './comments.selectors';
import { switchMapTo } from 'rxjs/operators';
import type { Comment } from '@typeorm/index';
import { RouterService } from '@ng-util/index';

@Injectable({
  providedIn: 'root',
})
export class CommentsFacadeService {
  constructor(
    private readonly store: Store,
    private readonly routerService: RouterService
  ) {}

  getUrl(commentId?: number) {
    const url = this.routerService.getUrl();
    const urlArray = url.split('/');
    if (commentId) {
      urlArray.push((commentId as unknown) as string);
    }
    const regex = /(?<=^\/)posts/;
    return urlArray.join('/').replace(regex, 'comments');
  }

  selectCommentsState$() {
    return this.store.select(CommentsSelectors.state());
  }

  selectCommentsList$() {
    return this.store.select(CommentsSelectors.list());
  }

  selectCommentsPageEvent$() {
    return this.store.select(CommentsSelectors.pageEvent());
  }

  dispatchCommentsPage$(pageEvent: PageEvent) {
    return this.store.dispatch(new Comments.Page(pageEvent));
  }

  dispatchCommentsCreate$(comment: Comment, url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Comments.Create(comment, url || this.getUrl(), extras)
    );
  }

  dispatchCommentsList$(url?: string, extras?: Extras) {
    return this.store.dispatch(new Comments.List(url || this.getUrl(), extras));
  }

  dispatchCommentsUpdate$(
    comment: Comment,
    commentId: number,
    url?: string,
    extras?: Extras
  ) {
    return this.store.dispatch(
      new Comments.Update(comment, url || this.getUrl(commentId), extras)
    );
  }

  dispatchCommentsDelete$(commentId: number, url?: string, extras?: Extras) {
    return this.store.dispatch(
      new Comments.Delete(url || this.getUrl(commentId), extras)
    );
  }

  dispatchCommentsReset$() {
    return this.store.dispatch(new Comments.Reset());
  }

  initializeComments$(url?: string, extras?: Extras) {
    return this.dispatchCommentsReset$().pipe(
      switchMapTo(this.dispatchCommentsList$(url, extras)),
      switchMapTo(this.selectCommentsList$())
    );
  }
}
