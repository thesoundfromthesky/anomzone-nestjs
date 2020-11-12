import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { PostsFacadeService, PostsFormService } from '@ngxs/lib/posts';
import type { Post } from '@typeorm/index';
import { ConfirmationService } from 'primeng/api';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  post$!: Observable<Post>;
  postsForm!: FormGroup;
  valueChanges$!: Observable<any>;
  isUnchanged!: boolean;

  constructor(
    private readonly postsFormService: PostsFormService,
    private readonly confirmationService: ConfirmationService,
    private readonly timerService: TimerService,
    private readonly postsFacadeService: PostsFacadeService
  ) {}

  ngOnInit(): void {
    this.isUnchanged = true;
    this.post$ = this.postsFacadeService.selectPostsGet$().pipe(
      tap((post: Post) => {
        this.postsForm = this.postsFormService.getPostsForm(post);

        this.valueChanges$ = this.postsForm.valueChanges.pipe(
          tap(() => {
            this.isUnchanged = false;
          })
        );
      })
    );
  }

  onSubmit() {
    this.timerService.run(() => {
      this.postsFormService.onUpdate(this.postsForm);
    });
  }

  onReset(post: Post) {
    this.postsFormService.onReset(this.postsForm, post);
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this post?',
      accept: () => {
        this.postsFormService.onDelete(
          this.postsForm.get('password') as FormControl
        );
      },
    });
  }
}
