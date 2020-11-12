import { DtoValidators } from '@server/app/core/validators';
import type { Comment, Reply } from '@typeorm/index';
import { CategoryGroup } from '@config/index';

export class DeleteReplyDto implements Partial<Reply> {
  comment!: Comment | number;

  author!: string;

  content!: string;

  @DtoValidators(CategoryGroup.Reply)
  password!: string;

  id!: number;
  ip!: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
