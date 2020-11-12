import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { OnInit } from '@angular/core';
import { RouterService } from '@ng-util/index';
import { PostsFacadeService } from '@ngxs/lib/posts';
import type { Post } from '@typeorm/index';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetComponent implements OnInit {
  post$!: Observable<Post>;
  pathname!: string;
  constructor(
    private readonly routerService: RouterService,
    private readonly postsFacadeService: PostsFacadeService
  ) {}

  ngOnInit(): void {
    this.pathname = this.routerService.getPathname();
    this.post$ = this.postsFacadeService.selectPostsGet$();
  }
}
