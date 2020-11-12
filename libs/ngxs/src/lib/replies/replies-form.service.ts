import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '@ng-util/index';
import { config } from '@config/index';
import { CategoryGroup } from '@config/index';
import type { Reply } from '@typeorm/index';
import { switchMap, take } from 'rxjs/operators';
import { RepliesFacadeService } from './replies-facade.service';

@Injectable({
  providedIn: 'root',
})
export class RepliesFormService {
  constructor(
    private readonly formService: FormService,
    private readonly repliesFacadeService: RepliesFacadeService,
    private readonly viewportScroller: ViewportScroller
  ) {}

  getRepliesForm(reply?: Reply): FormGroup {
    const repliesForm = this.formService.buildForm(CategoryGroup.Reply, reply);
    return repliesForm;
  }

  onCreate(repliesForm: FormGroup, commentId: number) {
    repliesForm.markAllAsTouched();

    if (repliesForm.valid) {
      let first = 0;
      let page = 0;
      let replyId = 0;
      this.repliesFacadeService
        .dispatchRepliesCreate$(repliesForm.value, commentId)
        .pipe(
          switchMap((state) => {
            this.onReset(repliesForm);

            let repliesCount = 0;
            for (const comment of state.comments.list[0]) {
              if (comment.id === commentId) {
                repliesCount = comment.repliesCount;
                break;
              }
            }

            page = Math.floor((1 + +repliesCount) / config.query.limit);

            first = page * config.query.limit;

            replyId = state.replies[commentId].create.id;
            return this.repliesFacadeService.dispatchRepliesList$(
              commentId,
              undefined,
              {
                params: { page: ((page + 1) as unknown) as string },
              }
            );
          }),
          switchMap(() => {
            return this.repliesFacadeService.dispatchRepliesPage$(commentId, {
              first,
              rows: config.query.limit,
              page,
            });
          }),
          take(1)
        )
        .subscribe({
          next: () => {
            setTimeout(() => {
              this.viewportScroller.scrollToAnchor(
                ['replies', replyId].join('-')
              );
            });
          },
        });
    }
  }

  onUpdate(repliesForm: FormGroup, commentId: number, replyId: number) {
    repliesForm.markAllAsTouched();
    if (repliesForm.valid) {
      this.repliesFacadeService
        .dispatchRepliesUpdate$(repliesForm.value, commentId, replyId)
        .pipe(
          switchMap((state) => {
            this.onReset(repliesForm);

            const page = state.replies[commentId].pageEvent.page;

            return this.repliesFacadeService.dispatchRepliesList$(
              commentId,
              undefined,
              {
                params: { page: ((1 + page) as unknown) as string },
              }
            );
          }),
          take(1)
        )
        .subscribe(() => {
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(
              ['replies', replyId].join('-')
            );
          });
        });
    }
  }

  onDelete(passwordControl: FormControl, commentId: number, replyId: number) {
    if (passwordControl.valid) {
      const extras = {
        body: { password: passwordControl.value },
      };

      this.repliesFacadeService
        .dispatchRepliesDelete$(commentId, replyId, undefined, extras)
        .pipe(
          switchMap((state) => {
            const page = state.replies[commentId].pageEvent.page;
            return this.repliesFacadeService.dispatchRepliesList$(
              commentId,
              undefined,
              {
                params: { page: ((page + 1) as unknown) as string },
              }
            );
          }),
          take(1)
        )
        .subscribe();
    }
  }

  onReset(repliesForm: FormGroup, reply?: Reply) {
    repliesForm.reset(reply);
  }
}
