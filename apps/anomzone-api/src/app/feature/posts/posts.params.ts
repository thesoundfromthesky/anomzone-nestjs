import { FindOneParams } from '@server/app/shared';
import { ValidateIf } from 'class-validator';
import { config } from '@config/index';
import type { KeyCategory } from '@config/index';
import { BadRequestException } from '@nestjs/common';

export class PostsParams extends FindOneParams {
  @ValidateIf((o: PostsParams, v: KeyCategory) => {
    if (v in config.categories) {
      return false;
    }
    throw new BadRequestException(`Category ${v} is not allowed`);
  })
  category!: KeyCategory;

  @ValidateIf((o: PostsParams, v) => {
    if (v in config.categories[o.category as KeyCategory]) {
      return false;
    }
    throw new BadRequestException(`Subcategory ${v} is not allowed`);
  })
  subcategory!: string;
}
