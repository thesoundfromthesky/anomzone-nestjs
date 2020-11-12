import { CategoryGroup } from '@config/index';
import { DtoValidators } from '@server/app/core/validators';
import type { Comment, Post } from '@typeorm/index';

export class CreateCommentDto implements Partial<Comment> {
  post?: Post | number;
  @DtoValidators(CategoryGroup.Comment)
  author!: string;

  @DtoValidators(CategoryGroup.Comment)
  content!: string;

  @DtoValidators(CategoryGroup.Comment)
  password!: string;

  id!: number;
  ip!: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
