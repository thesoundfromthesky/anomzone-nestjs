import { Min } from 'class-validator';
import { PostsParams } from '../posts/posts.params';
import { Expose, Type } from 'class-transformer';

export class CommentsParams extends PostsParams {
  @Expose({ name: 'post_id' })
  @Type(() => Number)
  @Min(1)
  postId!: number;
}
