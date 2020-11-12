import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import type { Reply, Comment } from '@typeorm/index';

@Component({
  selector: 'app-replies-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetComponent implements OnInit {
  @Input() reply!: Reply;
  @Input() id!: string;
  @Input() rowNumber!: number;
  @Input() comment!: Comment;

  showReply!: boolean;
  showEdit!: boolean;

  constructor() {}

  ngOnInit(): void {}

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
