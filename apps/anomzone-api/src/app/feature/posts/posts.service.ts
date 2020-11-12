import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import type { Repository } from 'typeorm';

import type { FindAllQuery } from '@server/app/shared';
import { config } from '@config/index';
import { CategoryGroup } from '@config/index';
import type { CreatePostDto } from './create-post.dto';
import type { UpdatePostDto } from './update-post.dto';
import type { Post, PostsList } from '@typeorm/index';
import type { DeletePostDto } from './delete-post.dto';
import type { PostsParams } from './posts.params';
import { join } from '@util/index';

@Injectable()
export class PostsService {
  constructor(private readonly entityManager: EntityManager) {}

  getTableName({ category, subcategory }: PostsParams) {
    return join([CategoryGroup.Post, category, subcategory]);
  }

  getRepository(postsParams: PostsParams): Repository<Post> {
    return this.entityManager.getRepository<Post>(
      this.getTableName(postsParams)
    );
  }

  async create(
    postsParams: PostsParams,
    createPostDto: CreatePostDto
  ): Promise<Post> {
    const repository = this.getRepository(postsParams);
    const post = repository.create(createPostDto);
    return repository.save(post);
  }

  list(
    postsParams: PostsParams,
    { page = 1 }: FindAllQuery
  ): Promise<PostsList> {
    const take = config.query.limit;
    const { category, subcategory } = postsParams;

    return Promise.all([
      this.getRepository(postsParams)
        .createQueryBuilder('post')
        .leftJoin(
          `${CategoryGroup.Comment}_${category}_${subcategory}`,
          'comment',
          'comment.post = post.id'
        )
        .leftJoin(
          `${CategoryGroup.Reply}_${category}_${subcategory}`,
          'reply',
          'reply.comment = comment.id and reply.deletedAt is null'
        )
        .groupBy('post.id')
        .select('post.id')
        .addSelect('post.author')
        .addSelect('post.title')
        .addSelect('post.createdAt')
        .addSelect(
          'COUNT(DISTINCT comment.id) FILTER(WHERE comment.deletedAt is null) + COUNT(reply.id)',
          'commentsCount'
        )
        .orderBy('post.id', 'DESC')
        .skip((page - 1) * take)
        .take(take)
        .getRawAndEntities()
        .then(({ raw, entities }) => {
          raw.forEach((v, i) => {
            if (v['post_id'] !== entities[i].id) {
              throw Error("Raw and Entity Id won't match");
            }
            entities[i].commentsCount = v.commentsCount;
          });
          return entities;
        }),
      this.getRepository(postsParams).count(),
    ]);

    // return Promise.all([
    //   this.getRepository(postsParams)
    //     .createQueryBuilder('post')
    //     .leftJoin(
    //       `${CategoryGroup.Comment}_${category}_${subcategory}`,
    //       'comment',
    //       'comment.post = post.id'
    //     )
    //     .leftJoin(
    //       `${CategoryGroup.Reply}_${category}_${subcategory}`,
    //       'reply',
    //       'reply.comment = comment.id and reply.deletedAt is null'
    //     )
    //     .groupBy('post.id')
    //     .select('post.id', 'id')
    //     .addSelect('post.author', 'author')
    //     .addSelect('post.title', 'title')
    //     .addSelect('post.createdAt', 'createdAt')
    //     .addSelect(
    //       'COUNT(DISTINCT comment.id) FILTER(WHERE comment.deletedAt is null) + COUNT(reply.id)',
    //       'commentsCount'
    //     )
    //     .orderBy('post.id', 'DESC')
    //     .skip((page - 1) * take)
    //     .take(take)
    //     .getRawMany(),
    //   this.getRepository(postsParams).count(),
    // ]);
  }

  get(postsParams: PostsParams): Promise<Post> | never {
    const { id } = postsParams;
    return this.getRepository(postsParams).findOneOrFail(id);
  }

  async update(
    postsParams: PostsParams,
    updatePostDto: UpdatePostDto
  ): Promise<Post> | never {
    const { id } = postsParams;
    const repository = this.getRepository(postsParams);
    const post = await repository.findOneOrFail(id);

    await post.authenticate(updatePostDto.password);

    return repository.save(Object.assign(post, updatePostDto));
  }

  async delete(
    postsParams: PostsParams,
    deletePostDto: DeletePostDto
  ): Promise<Post> | never {
    const { id } = postsParams;
    const repository = this.getRepository(postsParams);
    const post = await repository.findOneOrFail(id);

    await post.authenticate(deletePostDto.password);

    return repository.softRemove(post);
  }
}
