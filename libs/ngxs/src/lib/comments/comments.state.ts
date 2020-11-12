import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  COMMENTS_STATE_TOKEN,
  CommentsStateModel,
} from './comments-state.models';
import { CommentsService } from './comments.service';
import type { CommentsList, Comment } from '@typeorm/index';
import { Comments } from './comments.actions';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { config } from '@config/index';

const initialCommentsState = {
  list: [[], 0] as CommentsList,
  create: {} as Comment,
  update: {} as Comment,
  delete: {} as Comment,
  pageEvent: { first: 0, rows: config.query.limit, page: 0, pageCount: 0 },
};

@State<CommentsStateModel>({
  name: COMMENTS_STATE_TOKEN,
  defaults: initialCommentsState,
})
@Injectable()
export class CommentsState {
  constructor(private readonly commentsService: CommentsService) {}

  @Action(Comments.Page, { cancelUncompleted: true })
  actionCommentsPage$(
    { setState }: StateContext<CommentsStateModel>,
    { pageEvent }: Comments.Page
  ) {
    setState(patch({ pageEvent }));
  }

  @Action(Comments.Create, { cancelUncompleted: true })
  actionCommentsCreate$(
    { setState }: StateContext<CommentsStateModel>,
    { comment, url, extras }: Comments.Create
  ) {
    return this.commentsService.create$(comment, url, extras).pipe(
      tap((createdComment) => {
        setState(patch({ create: createdComment }));
      })
    );
  }

  @Action(Comments.List, { cancelUncompleted: true })
  actionCommentsList$(
    { setState }: StateContext<CommentsStateModel>,
    { url, extras }: Comments.List
  ) {
    return this.commentsService.list$(url, extras).pipe(
      tap((commentsList) => {
        setState(patch({ list: commentsList }));
      })
    );
  }

  // //   @Action(Posts.Get, { cancelUncompleted: true })
  // //   actionPostsGet$({ setState }: StateContext<PostsStateModel>) {
  // //     this.startLoading();
  // //     return this.db.docGet$<Post>(`${this.path}/${this.id}`).pipe(
  // //       map((arr) => {
  // //         return { [arr.id]: arr };
  // //       }),
  // //       tap((v) => {
  // //         setState(
  // //           patch({
  // //             [this.path]: patch({ data: patch(v) }),
  // //           })
  // //         );
  // //         this.finishLoading();
  // //       })
  // //     );
  // //   }

  @Action(Comments.Update, { cancelUncompleted: true })
  actionCommentsUpdate$(
    { setState }: StateContext<CommentsStateModel>,
    { comment, url, extras }: Comments.Update
  ) {
    return this.commentsService.update$(comment, url, extras).pipe(
      tap((updatedComment) => {
        setState(patch({ update: updatedComment }));
      })
    );
  }

  @Action(Comments.Delete, { cancelUncompleted: true })
  actionCommentsDelete$(
    { setState }: StateContext<CommentsStateModel>,
    { url, extras }: Comments.Delete
  ) {
    return this.commentsService.delete$(url, extras).pipe(
      tap((comment) => {
        setState(patch({ delete: comment }));
      })
    );
  }

  @Action(Comments.Reset, { cancelUncompleted: true })
  actionCommentsReset$({ setState }: StateContext<CommentsStateModel>) {
    setState(initialCommentsState);
  }
}
