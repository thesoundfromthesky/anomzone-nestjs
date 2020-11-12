import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { CommentsFormService } from '@ngxs/lib/comments';
import type { Comment } from '@typeorm/index';
import { ConfirmationService } from 'primeng/api';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UpdateRequestEvent {
  first: number;
  comment: Comment;
}

@Component({
  selector: 'app-comments-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() id!: string;
  @Input() rowNumber!: number;

  commentsForm!: FormGroup;

  valueChanges$!: Observable<any>;
  isUnchanged!: boolean;

  constructor(
    private readonly commentsFormService: CommentsFormService,
    private readonly timerService: TimerService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.isUnchanged = true;
    this.commentsForm = this.commentsFormService.getCommentsForm(this.comment);

    this.valueChanges$ = this.commentsForm.valueChanges.pipe(
      tap(() => {
        this.isUnchanged = false;
      })
    );
  }

  onSubmit() {
    this.timerService.run(() => {
      this.commentsFormService.onUpdate(this.commentsForm, this.comment.id);
    });
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to hide this comment?',
      accept: () => {
        this.commentsFormService.onDelete(
          this.commentsForm.get('password') as FormControl,
          this.comment.id
        );
      },
    });
  }

  onReset() {
    this.commentsFormService.onReset(this.commentsForm, this.comment);
  }
}
