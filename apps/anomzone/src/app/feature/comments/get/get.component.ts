import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import {
  RepliesFacadeService,
  RepliesSelectCreate,
  RepliesSelectList,
} from '@ngxs/lib/replies';
import type { Comment } from '@typeorm/index';
import { isObjectEmpty } from '@util/index';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-comments-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() rowNumber!: number;
  @Input() id!: string;

  showReply!: boolean;
  showEdit!: boolean;
  showReplies!: boolean;

  repliesSelectList$!: Observable<RepliesSelectList>;
  repliesSelectCreate$!: Observable<RepliesSelectCreate>;

  constructor(private readonly repliesFacadeService: RepliesFacadeService) {}

  ngOnInit(): void {
    this.showReply = false;
    this.showEdit = false;
    this.showReplies = false;

    this.repliesSelectList$ = this.repliesFacadeService.selectRepliesList$(
      this.comment.id
    );

    this.repliesSelectCreate$ = this.repliesFacadeService
      .selectRepliesCreate$(this.comment.id)
      .pipe(
        tap((reply) => {
          if (!isObjectEmpty(reply)) {
            this.showReply = false;
            this.showReplies = true;
          }
        })
      );
  }

  toggleShowRelies() {
    this.showReplies = !this.showReplies;
  }

  toggleShowReply() {
    this.showReply = !this.showReply;
    if (this.showReply) {
      this.showEdit = false;
    }
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
    if (this.showEdit) {
      this.showReply = false;
    }
  }
}
