import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { config } from '@config/index';
import { RepliesStateModel, REPLIES_STATE_TOKEN } from './replies-state.models';
import type { RepliesList, Reply } from '@typeorm/index';
import { RepliesService } from './replies.service';
import { Replies } from './replies.actions';

const initialRepliesState = {
  list: [[], 0] as RepliesList,
  create: {} as Reply,
  update: {} as Reply,
  delete: {} as Reply,
  pageEvent: { first: 0, rows: config.query.limit, page: 0, pageCount: 0 },
};

@State<RepliesStateModel>({
  name: REPLIES_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class RepliesState {
  constructor(private readonly repliesService: RepliesService) {}

  initRepliesState(commentId: number) {
    return (commentsListState: RepliesStateModel) => {
      if (commentsListState[commentId]) {
        return commentsListState;
      } else {
        return { ...commentsListState, [commentId]: initialRepliesState };
      }
    };
  }

  @Action(Replies.Page, { cancelUncompleted: true })
  actionRepliesPage$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, pageEvent }: Replies.Page
  ) {
    setState(this.initRepliesState(commentId));

    setState(patch({ [commentId]: patch({ pageEvent }) }));
  }

  @Action(Replies.Create, { cancelUncompleted: true })
  actionRepliesCreate$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, reply, url, extras }: Replies.Create
  ) {
    setState(this.initRepliesState(commentId));

    return this.repliesService.create$(reply, url, extras).pipe(
      tap((createdReply) => {
        setState(patch({ [commentId]: patch({ create: createdReply }) }));
      })
    );
  }

  @Action(Replies.List, { cancelUncompleted: true })
  actionRepliesList$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, url, extras }: Replies.List
  ) {
    setState(this.initRepliesState(commentId));

    return this.repliesService.list$(url, extras).pipe(
      tap((replies) => {
        setState(
          patch({
            [commentId]: patch({ list: replies }),
          })
        );
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

  @Action(Replies.Update, { cancelUncompleted: true })
  actionRepliesUpdate$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, reply, url, extras }: Replies.Update
  ) {
    setState(this.initRepliesState(commentId));

    return this.repliesService.update$(reply, url, extras).pipe(
      tap((updatedReply) => {
        setState(patch({ [commentId]: patch({ update: updatedReply }) }));
      })
    );
  }

  @Action(Replies.Delete, { cancelUncompleted: true })
  actionRepliesDelete$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, url, extras }: Replies.Delete
  ) {
    setState(this.initRepliesState(commentId));

    return this.repliesService.delete$(url, extras).pipe(
      tap((reply) => {
        setState(patch({ [commentId]: patch({ delete: reply }) }));
      })
    );
  }

  @Action(Replies.Reset, { cancelUncompleted: true })
  actionRepliesReset$(
    { setState }: StateContext<RepliesStateModel>,
    { commentId, method }: Replies.Reset
  ) {
    if (commentId === ('reset' as any)) {
      setState({});
      return;
    }

    setState(this.initRepliesState(commentId));

    if (method) {
      setState(patch({ [commentId]: patch({ [method]: {} }) }));
    } else {
      setState(patch({ [commentId]: initialRepliesState }));
    }
  }
}
