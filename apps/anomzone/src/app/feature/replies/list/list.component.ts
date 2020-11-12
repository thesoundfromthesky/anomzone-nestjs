import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MediaBreakpointsService } from '@ng-util/index';
import type { RepliesList, Comment } from '@typeorm/index';
import type { Observable } from 'rxjs';
import { RepliesFacadeService } from '@ngxs/lib/replies';

@Component({
  selector: 'app-replies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() comment!: Comment;

  replies$!: Observable<RepliesList>;

  mb$!: Observable<boolean>;

  pageEvent$!: Observable<PageEvent>;
  constructor(
    private readonly repliesFacadeService: RepliesFacadeService,
    private readonly mb: MediaBreakpointsService
  ) {}

  ngOnInit(): void {
    this.mb$ = this.mb.observeBreakpoint('p-md');

    this.replies$ = this.repliesFacadeService.initializeReplies$(
      this.comment.id
    );

    this.pageEvent$ = this.repliesFacadeService.selectRepliesPageEvent$(
      this.comment.id
    );
  }

  paginate(event: PageEvent) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.repliesFacadeService.dispatchRepliesPage$(this.comment.id, event);
    this.repliesFacadeService.dispatchRepliesList$(this.comment.id, undefined, {
      params: { page: ((event.page + 1) as unknown) as string },
    });
  }
}
