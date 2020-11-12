import { listPostEntity } from './post.entity';
import { listCommentEntity } from './comment.entity';
import { listReplyEntity } from './reply.entity';

import type { EntitySchema } from 'typeorm';

export const ecologyEntity = ([] as (
  | string
  | (new () => unknown)
  | EntitySchema<unknown>
)[]).concat(listPostEntity(), listCommentEntity(), listReplyEntity());
