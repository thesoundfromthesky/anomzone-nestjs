import { Entity } from 'typeorm';
import { ColumnValidators } from './entity.decorators';
import { Metadata } from './metadata.entity';
import { join } from '@util/index';
import type { Comment } from './comment.entity';
import { config, CategoryGroup } from '@config/index';
import type { KeyCategory } from '@config/index';

export type PostsList = [Post[], number];
type PostValidators = keyof typeof config.entities.post;

export abstract class Post extends Metadata
  implements Record<PostValidators, string> {
  @ColumnValidators(CategoryGroup.Post)
  author!: string;

  @ColumnValidators(CategoryGroup.Post)
  title!: string;

  @ColumnValidators(CategoryGroup.Post)
  content!: string;

  commentsCount?: number;
  comments?: Comment[];
}

type PostEntityConstructor = new () => Post;
export function listPostEntity(): PostEntityConstructor[] {
  let entities: PostEntityConstructor[] = [];
  for (const category in config.categories) {
    entities = entities.concat(
      Object.keys(config.categories[category as KeyCategory]).map(
        (subcategory) => {
          @Entity({ name: join([CategoryGroup.Post, category, subcategory]) })
          class PostEntity extends Post {
            // @OneToMany<Comment>(
            //   () =>
            //     getEntityTarget(
            //       join([CategoryGroup.Comment, category, subcategory])
            //     ),
            //   (comment) => comment.post
            // )
            // comments!: Comment[];
          }

          return PostEntity;
        }
      )
    );
  }
  return entities;
}
