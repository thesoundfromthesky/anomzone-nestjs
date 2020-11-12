import type { Post } from '@typeorm/index';
import { DtoValidators } from '@server/app/core/validators';
import { CategoryGroup } from '@config/index';

export class UpdatePostDto implements Partial<Post> {
  author!: string;

  @DtoValidators(CategoryGroup.Post, true)
  title!: string;

  @DtoValidators(CategoryGroup.Post, true)
  content!: string;

  @DtoValidators(CategoryGroup.Post)
  password!: string;

  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
  ip!: string;
}
