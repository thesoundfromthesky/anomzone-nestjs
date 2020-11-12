import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ValidationGroup } from '@config/index';
import { FindAllQuery } from '@server/app/shared';
import { CreateReplyDto } from './create-reply.dto';
import { DeleteReplyDto } from './delete-reply.dto';
import { UpdateReplyDto } from './update-reply.dto';

import { RepliesParams } from './replies.params';
import { RepliesService } from './replies.service';

@Controller('replies/:category/:subcategory/:comment_id')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(
    @Param() repliesParams: RepliesParams,
    @Body() createReplyDto: CreateReplyDto,
    @Ip() ip: string
  ) {
    createReplyDto.ip = ip;
    createReplyDto.comment = repliesParams.commentId;
    return this.repliesService.create(repliesParams, createReplyDto);
  }

  @Get()
  list(@Param() repliesParams: RepliesParams, @Query() query: FindAllQuery) {
    return this.repliesService.list(repliesParams, query);
  }

  @Get(':id')
  get(@Param() repliesParams: RepliesParams) {
    return this.repliesService.get(repliesParams);
  }

  @Put(':id')
  update(
    @Param() repliesParams: RepliesParams,
    @Body() updateCommentDto: UpdateReplyDto
  ) {
    return this.repliesService.update(repliesParams, updateCommentDto);
  }

  @SerializeOptions({
    groups: [ValidationGroup.Delete],
  })
  @Delete(':id')
  delete(
    @Param() repliesParams: RepliesParams,
    @Body() deleteReplyDto: DeleteReplyDto
  ) {
    return this.repliesService.delete(repliesParams, deleteReplyDto);
  }
}
