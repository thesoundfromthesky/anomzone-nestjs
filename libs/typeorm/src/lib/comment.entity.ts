import type { KeyCategory } from '@config/index';
import { CategoryGroup, config } from '@config/index';
import { ColumnValidators } from './entity.decorators';
import { Metadata } from './metadata.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Post } from './post.entity';
import { getEntityTarget } from './entity.util';
import { join } from '@util/index';
// import { Reply } from '../replies';

export type CommentsList = [Comment[], number];
type CommentValidators = keyof typeof config.entities.comment;
export abstract class Comment extends Metadata
  implements Record<CommentValidators, string> {
  @ColumnValidators(CategoryGroup.Comment)
  author!: string;

  @ColumnValidators(CategoryGroup.Comment)
  content!: string;

  @Column({
    type: 'int',
    nullable: true,
    select: false,
    update: false,
    insert: false,
  })
  repliesCount?: number;

  post?: Post | number;
  // @Column({ name: 'parent_id', nullable: true })
  // parent?: Comment | number;
  // children?: Comment[];
}

type CommentEntityConstructor = new () => Comment;
export function listCommentEntity(): CommentEntityConstructor[] {
  let entities: CommentEntityConstructor[] = [];
  for (const category in config.categories) {
    entities = entities.concat(
      Object.keys(config.categories[category as KeyCategory]).map(
        (subcategory) => {
          @Entity({
            name: join([CategoryGroup.Comment, category, subcategory]),
          })
          class CommentEntity extends Comment {
            @ManyToOne(
              () =>
                getEntityTarget(
                  join([CategoryGroup.Post, category, subcategory])
                ),
              {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                nullable: false,
              }
            )
            @JoinColumn({ name: 'post_id' })
            post!: Post;

            // @OneToMany<Reply>(
            //   () => getEntityTarget(join([CategoryGroup.Reply, category, subcategory])),
            //   (reply) => reply.comment
            // )
            // replies!: Reply[];
          }
          return CommentEntity;
        }
      )
    );
  }
  return entities;
}
