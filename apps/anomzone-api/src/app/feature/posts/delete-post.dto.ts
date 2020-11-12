import { CategoryGroup } from '@config/index';
import { DtoValidators } from '@server/app/core/validators';
import type { Post } from '@typeorm/index';

export class DeletePostDto implements Partial<Post> {
  title!: string;
  content!: string;
  author!: string;

  @DtoValidators(CategoryGroup.Post)
  password!: string;

  id!: number;
  ip!: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
