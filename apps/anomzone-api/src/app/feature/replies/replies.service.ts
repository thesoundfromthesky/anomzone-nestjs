import { Injectable } from '@nestjs/common';
import { CategoryGroup } from '@config/index';
import type { FindAllQuery } from '@server/app/shared';
import { join } from '@util/index';
import { EntityManager } from 'typeorm';
import type { Repository } from 'typeorm';
import { CreateReplyDto } from './create-reply.dto';
import type { RepliesParams } from './replies.params';
import type { RepliesList, Reply } from '@typeorm/index';
import { config } from '@config/index';
import type { UpdateReplyDto } from './update-reply.dto';
import type { DeleteReplyDto } from './delete-reply.dto';

@Injectable()
export class RepliesService {
  constructor(private readonly entityManager: EntityManager) {}

  getTableName({ category, subcategory }: RepliesParams) {
    return join([CategoryGroup.Reply, category, subcategory]);
  }

  getRepository(repliesParams: RepliesParams): Repository<Reply> {
    return this.entityManager.getRepository<Reply>(
      this.getTableName(repliesParams)
    );
  }

  async create(
    repliesParams: RepliesParams,
    createReplyDto: CreateReplyDto
  ): Promise<Reply> {
    const repository = this.getRepository(repliesParams);
    const reply = repository.create(createReplyDto);
    await repository.save(reply);
    return reply;
  }

  list(
    repliesParams: RepliesParams,
    { page = 1 }: FindAllQuery
  ): Promise<RepliesList> {
    const take = config.query.limit;
    const { commentId } = repliesParams;
    return this.getRepository(repliesParams).findAndCount({
      where: { comment: commentId },
      skip: (page - 1) * take,
      take,
      order: { id: 'ASC' },
    });
  }

  get(repliesParams: RepliesParams): Promise<Reply> | never {
    const { id, commentId } = repliesParams;
    return this.getRepository(repliesParams).findOneOrFail({
      where: { id, comment: commentId },
    });
  }

  async update(
    repliesParams: RepliesParams,
    updateReplyDto: UpdateReplyDto
  ): Promise<Reply> | never {
    const { id, commentId } = repliesParams;
    const repository = this.getRepository(repliesParams);
    const reply = await repository.findOneOrFail({
      where: { id, comment: commentId },
    });

    await reply.authenticate(updateReplyDto.password);
    return repository.save(Object.assign(reply, updateReplyDto));
  }

  async delete(
    repliesParams: RepliesParams,
    deleteReplyDto: DeleteReplyDto
  ): Promise<Reply> | never {
    const { id, commentId } = repliesParams;
    const repository = this.getRepository(repliesParams);
    const reply = await repository.findOneOrFail({
      where: { id, comment: commentId },
    });

    await reply.authenticate(deleteReplyDto.password);
    return repository.softRemove(reply);
  }
}
