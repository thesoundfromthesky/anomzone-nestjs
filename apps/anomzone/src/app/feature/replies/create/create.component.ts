import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimerService } from '@ng-util/index';
import { RepliesFormService } from '@ngxs/lib/replies';
import type { Comment, Reply } from '@typeorm/index';

@Component({
  selector: 'app-replies-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  @Input() id!: string;
  @Input() comment!: Comment;
  @Input() reply?: Reply;
  repliesForm!: FormGroup;

  constructor(
    private readonly repliesFormService: RepliesFormService,
    private readonly timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.repliesForm = this.repliesFormService.getRepliesForm({
      content: this.reply && '@' + this.reply.author + ' ',
    } as Reply);
  }

  onSubmit() {
    this.timerService.run(() => {
      this.repliesFormService.onCreate(this.repliesForm, this.comment.id);
    });
  }

  onReset() {
    this.repliesFormService.onReset(this.repliesForm);
  }
}
