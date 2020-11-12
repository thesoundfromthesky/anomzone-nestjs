import { CategoryGroup } from '@config/index';
import { DtoValidators } from '@server/app/core/validators';
import type { Comment } from '@typeorm/index';

export class UpdateCommentDto implements Partial<Comment> {
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
