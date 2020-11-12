import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { PostsFormService } from '@ngxs/lib/posts';

@Component({
  selector: 'app-posts-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  postsForm!: FormGroup;

  constructor(
    private readonly postsFormService: PostsFormService,
    private readonly timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.postsForm = this.postsFormService.getPostsForm();
  }

  onSubmit() {
    this.timerService.run(() => {
      this.postsFormService.onCreate(this.postsForm);
    });
  }

  onReset() {
    this.postsFormService.onReset(this.postsForm);
  }
}
