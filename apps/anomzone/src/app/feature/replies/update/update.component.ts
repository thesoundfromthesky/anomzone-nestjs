import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { RepliesFormService } from '@ngxs/lib/replies';
import type { Reply, Comment } from '@typeorm/index';
import { ConfirmationService } from 'primeng/api';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-replies-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnInit {
  @Input() rowNumber!: number;
  @Input() reply!: Reply;
  @Input() id!: string;
  @Input() comment!: Comment;

  repliesForm!: FormGroup;

  valueChanges$!: Observable<any>;
  isUnchanged!: boolean;

  constructor(
    private readonly repliesFormService: RepliesFormService,
    private readonly timerService: TimerService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.isUnchanged = true;
    this.repliesForm = this.repliesFormService.getRepliesForm(this.reply);

    this.valueChanges$ = this.repliesForm.valueChanges.pipe(
      tap(() => {
        this.isUnchanged = false;
      })
    );
  }

  onSubmit() {
    this.timerService.run(() => {
      this.repliesFormService.onUpdate(
        this.repliesForm,
        this.comment.id,
        this.reply.id
      );
    });
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to hide this comment?',
      accept: () => {
        this.repliesFormService.onDelete(
          this.repliesForm.get('password') as FormControl,
          this.comment.id,
          this.reply.id
        );
      },
    });
  }

  onReset() {
    this.repliesFormService.onReset(this.repliesForm, this.reply);
  }
}
