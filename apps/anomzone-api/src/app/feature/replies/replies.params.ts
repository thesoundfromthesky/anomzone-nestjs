import { Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PostsParams } from '../posts/posts.params';

export class RepliesParams extends PostsParams {
  @Expose({ name: 'comment_id' })
  @Type(() => Number)
  @Min(1)
  commentId!: number;
}
