import { CategoryGroup } from '@config/index';
import { DtoValidators } from '@server/app/core/validators';
import type { Post } from '@typeorm/index';

export class CreatePostDto implements Partial<Post> {
  @DtoValidators(CategoryGroup.Post)
  author!: string;

  @DtoValidators(CategoryGroup.Post)
  title!: string;

  @DtoValidators(CategoryGroup.Post)
  content!: string;

  @DtoValidators(CategoryGroup.Post)
  password!: string;

  id!: number;
  ip!: string;

  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;
}
