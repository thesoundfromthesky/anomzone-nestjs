import { ColumnValidators } from './entity.decorators';
import { Metadata } from './metadata.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { getEntityTarget } from './entity.util';
import { join } from '@util/index';
import type { Comment } from './comment.entity';
import { config, CategoryGroup } from '@config/index';
import type { KeyCategory } from '@config/index';

export type RepliesList = [Reply[], number];
type RepliesValidators = keyof typeof config.entities.reply;
export abstract class Reply extends Metadata
  implements Record<RepliesValidators, string> {
  @ColumnValidators(CategoryGroup.Reply)
  author!: string;

  @ColumnValidators(CategoryGroup.Reply)
  content!: string;

  comment?: Comment | number;
}

type ReplyEntityConstructor = new () => Reply;
export function listReplyEntity(): ReplyEntityConstructor[] {
  let entities: ReplyEntityConstructor[] = [];
  for (const category in config.categories) {
    entities = entities.concat(
      Object.keys(config.categories[category as KeyCategory]).map(
        (subcategory) => {
          @Entity({ name: join([CategoryGroup.Reply, category, subcategory]) })
          class ReplyEntity extends Reply {
            @ManyToOne(
              () =>
                getEntityTarget(
                  join([CategoryGroup.Comment, category, subcategory])
                ),
              {
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                nullable: false,
              }
            )
            @JoinColumn({ name: 'comment_id' })
            comment!: Comment;
          }
          return ReplyEntity;
        }
      )
    );
  }
  return entities;
}
