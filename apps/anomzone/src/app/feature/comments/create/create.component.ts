import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { CommentsFormService } from '@ngxs/lib/comments';
import type { Comment } from '@typeorm/index';

export interface CreateRequestEvent {
  first: number;
  comment: Comment;
}

@Component({
  selector: 'app-comments-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  commentsForm!: FormGroup;

  constructor(
    private readonly commentsFormService: CommentsFormService,
    private readonly timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.commentsForm = this.commentsFormService.getCommentsForm();
  }

  onSubmit() {
    this.timerService.run(() => {
      this.commentsFormService.onCreate(this.commentsForm);
    });
  }

  onReset() {
    this.commentsFormService.onReset(this.commentsForm);
  }
}
