import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { OnInit } from '@angular/core';
import { MediaBreakpointsService } from '@ng-util/index';
import type { CommentsList } from '@typeorm/index';
import type { Observable } from 'rxjs';
import { CommentsFacadeService } from '@ngxs/lib/comments';
import { RepliesFacadeService } from '@ngxs/lib/replies';

@Component({
  selector: 'app-comments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  comments$!: Observable<CommentsList>;
  rows!: number;
  first!: number;
  mb$!: Observable<boolean>;

  pageEvent$!: Observable<PageEvent>;
  constructor(
    private readonly commentsFacadeService: CommentsFacadeService,
    private readonly repliesFacadeService: RepliesFacadeService,
    private readonly mb: MediaBreakpointsService
  ) {
    this.repliesFacadeService.dispatchRepliesReset$('reset' as any);
  }

  ngOnInit(): void {
    this.mb$ = this.mb.observeBreakpoint('p-md');

    this.comments$ = this.commentsFacadeService.initializeComments$();
    this.pageEvent$ = this.commentsFacadeService.selectCommentsPageEvent$();
  }

  paginate(event: PageEvent) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.commentsFacadeService.dispatchCommentsPage$(event);
    this.commentsFacadeService.dispatchCommentsList$(undefined, {
      params: { page: ((event.page + 1) as unknown) as string },
    });
  }
}
