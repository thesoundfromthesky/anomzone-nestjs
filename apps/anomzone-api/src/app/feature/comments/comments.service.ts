import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CategoryGroup } from '@config/index';
import type { Comment, CommentsList } from '@typeorm/index';
import type { CreateCommentDto } from './create-comment.dto';
import type { UpdateCommentDto } from './update-comment.dto';
import type { DeleteCommentDto } from './delete-comment.dto';
import type { FindAllQuery } from '@server/app/shared';
import { config } from '@config/index';
import { join } from '@util/index';
import type { CommentsParams } from './comments.params';

@Injectable()
export class CommentsService {
  constructor(private readonly entityManager: EntityManager) {}

  getTableName({ category, subcategory }: CommentsParams) {
    return join([CategoryGroup.Comment, category, subcategory]);
  }

  getRepository(commentsParams: CommentsParams): Repository<Comment> {
    return this.entityManager.getRepository<Comment>(
      this.getTableName(commentsParams)
    );
  }

  async create(
    commentsParams: CommentsParams,
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const repository = this.getRepository(commentsParams);
    const comment = repository.create(createCommentDto);
    return repository.save(comment);
  }

  // async createChild(
  //   { category, postId, id }: CommentsParams,
  //   createCommentDto: CreateCommentDto,
  // ): Promise<Comment> | never {
  //   const repository = this.getRepository(category);
  //   const comment = await repository.findOneOrFail({
  //     where: { id, post: postId },
  //   });
  //   console.log(comment);
  //   const childComment = repository.create(createCommentDto);
  //   childComment.parent = comment;
  //   return repository.save(childComment);
  // }

  async list(
    commentsParams: CommentsParams,
    { page = 1 }: FindAllQuery
  ): Promise<CommentsList> {
    const take = config.query.limit;
    const { postId, category, subcategory } = commentsParams;

    return this.getRepository(commentsParams)
      .createQueryBuilder('comment')
      .leftJoin(
        `${CategoryGroup.Reply}_${category}_${subcategory}`,
        'reply',
        'reply.comment = comment.id and reply.deletedAt IS NULL'
      )
      .where('comment.post = :postId', { postId })
      .groupBy('comment.id')
      .addSelect('COUNT(reply.id)', 'comment_repliesCount')
      .orderBy('comment.id', 'ASC')
      .skip((page - 1) * take)
      .take(take)
      .withDeleted()
      .getManyAndCount();

    // return Promise.all([
    //   this.getRepository(commentsParams)
    //     .createQueryBuilder('comment')
    //     .leftJoin(
    //       `${CategoryGroup.Reply}_${category}_${subcategory}`,
    //       'reply',
    //       'reply.comment = comment.id and reply.deletedAt IS NULL'
    //     )
    //     .where('comment.post = :postId', { postId })
    //     .groupBy('comment.id')
    //     .select('comment.id', 'id')
    //     .addSelect('comment.author', 'author')
    //     .addSelect('comment.content', 'content')
    //     .addSelect('comment.createdAt', 'createdAt')
    //     .addSelect('comment.updatedAt', 'updatedAt')
    //     .addSelect('comment.deletedAt', 'deletedAt')
    //     .addSelect('comment.ip', 'ip')
    //     .addSelect('COUNT(reply.id)', 'repliesCount')
    //     .orderBy('comment.id', 'ASC')
    //     .offset((page - 1) * take)
    //     .limit(take)
    //     .withDeleted()
    //     .getRawMany(),
    //   this.getRepository(commentsParams).count({
    //     where: {
    //       post: postId,
    //     },
    //   }),
    // ]);
  }

  get(commentsParams: CommentsParams): Promise<Comment> | never {
    const { id, postId } = commentsParams;
    return this.getRepository(commentsParams).findOneOrFail({
      where: { id, post: postId },
    });
  }

  async update(
    commentsParams: CommentsParams,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> | never {
    const { id, postId } = commentsParams;
    const repository = this.getRepository(commentsParams);
    const comment = await repository.findOneOrFail({
      where: { id, post: postId },
    });

    await comment.authenticate(updateCommentDto.password);
    return repository.save(Object.assign(comment, updateCommentDto));
  }

  async delete(
    commentsParams: CommentsParams,
    deleteCommentDto: DeleteCommentDto
  ): Promise<Comment> | never {
    const { id, postId } = commentsParams;
    const repository = this.getRepository(commentsParams);
    const comment = await repository.findOneOrFail({
      where: { id, post: postId },
    });

    await comment.authenticate(deleteCommentDto.password);
    return repository.softRemove(comment);
  }
}
