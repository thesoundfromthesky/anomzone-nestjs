import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { Observable } from 'rxjs';

import { MediaBreakpointsService, RouterService } from '@ng-util/index';
import { LoadingFacadeService } from '@ngxs/lib/loading';
import type { Post, PostsList } from '@typeorm/index';
import { LazyLoadEvent } from 'primeng/api';
import { PostsFacadeService } from '@ngxs/lib/posts';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  // Virtual Scroll tutorial
  // https://www.youtube.com/watch?v=Ppl64MY6FFc

  @Input()
  rowIndex!: number;

  cols!: { field: string; header: string; width: string }[];
  posts$!: Observable<PostsList>;

  mb$!: Observable<boolean>;

  loading$!: Observable<boolean>;
  pathname!: string;

  pageEvent$!: Observable<PageEvent>;

  constructor(
    private readonly mb: MediaBreakpointsService,
    private readonly loading: LoadingFacadeService,
    private readonly postsFacadeService: PostsFacadeService,
    private readonly routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.pathname = this.routerService.getPathname();
    this.posts$ = this.postsFacadeService.selectPostsList$();
    this.pageEvent$ = this.postsFacadeService.selectPostsPageEvent$();

    this.loading$ = this.loading.selectLoading$();
    
    this.mb$ = this.mb.observeBreakpoint('p-md');
    this.cols = [
      { field: 'title', header: 'Title', width: '100%' },
      { field: 'author', header: 'Author', width: '15%' },
      { field: 'createdAt', header: 'Created At', width: '23%' },
    ];
  }

  trackByFn(i: number, v: Post) {
    return v?.id;
  }

  loadPosts(event: LazyLoadEvent) {
    //https://www.primefaces.org/primeng/showcase/#/table/lazy
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    const page = (event.first ?? 0) / (event.rows ?? 0) + 1;

    this.routerService.navigate([this.pathname], { queryParams: { page } });
  }
}
