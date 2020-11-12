import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '@ng-util/index';
import { CategoryGroup } from '@config/index';
import { CommentsFacadeService } from './comments-facade.service';
import { switchMap, take } from 'rxjs/operators';
import { config } from '@config/index';
import type { Comment } from '@typeorm/index';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommentsFormService {
  constructor(
    private readonly formService: FormService,
    private readonly commentsFacadeService: CommentsFacadeService,
    private readonly viewportScroller: ViewportScroller
  ) {}

  getCommentsForm(comment?: Comment): FormGroup {
    const commentsForm = this.formService.buildForm(
      CategoryGroup.Comment,
      comment
    );
    return commentsForm;
  }

  onCreate(commentsForm: FormGroup) {
    commentsForm.markAllAsTouched();

    if (commentsForm.valid) {
      let first = 0;
      let page = 0;
      this.commentsFacadeService
        .dispatchCommentsCreate$(commentsForm.value)
        .pipe(
          switchMap((state) => {
            page = Math.floor(
              (1 + +state.comments.list[1]) / config.query.limit
            );

            first = page * config.query.limit;

            return this.commentsFacadeService.dispatchCommentsList$(undefined, {
              params: { page: ((1 + page) as unknown) as string },
            });
          }),
          switchMap(() => {
            return this.commentsFacadeService.dispatchCommentsPage$({
              first,
              rows: config.query.limit,
              page,
            });
          }),
          take(1)
        )
        .subscribe((state) => {
          this.onReset(commentsForm);
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(
              ['comments', state.comments.create.id].join('-')
            );
          });
        });
    }
  }

  onUpdate(commentsForm: FormGroup, commentId: number) {
    commentsForm.markAllAsTouched();

    if (commentsForm.valid) {
      this.commentsFacadeService
        .dispatchCommentsUpdate$(commentsForm.value, commentId)
        .pipe(
          switchMap((state) => {
            const page = state.comments.pageEvent.page;
            return this.commentsFacadeService.dispatchCommentsList$(undefined, {
              params: { page: ((1 + page) as unknown) as string },
            });
          }),
          take(1)
        )
        .subscribe((state) => {
          this.onReset(commentsForm);
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(
              ['comments', state.comments.create.id].join('-')
            );
          });
        });
    }
  }

  onDelete(passwordControl: FormControl, commentId: number) {
    if (passwordControl.valid) {
      const extras = {
        body: { password: passwordControl.value },
      };

      this.commentsFacadeService
        .dispatchCommentsDelete$(commentId, undefined, extras)
        .pipe(
          switchMap((state) => {
            const page = state.comments.pageEvent.page;
            return this.commentsFacadeService.dispatchCommentsList$(undefined, {
              params: { page: ((page + 1) as unknown) as string },
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  onReset(commentsForm: FormGroup, comment?: Comment) {
    commentsForm.reset(comment);
  }
}
