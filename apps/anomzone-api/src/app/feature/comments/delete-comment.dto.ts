import { CategoryGroup } from '@config/index';
import { DtoValidators } from '@server/app/core/validators';
import type { Comment } from '@typeorm/index';

export class DeleteCommentDto implements Partial<Comment> {
  author!: string;

  content!: string;

  @DtoValidators(CategoryGroup.Comment)
  password!: string;

  id!: number;
  ip!: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
