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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';
import { DeleteCommentDto } from './delete-comment.dto';
import { FindAllQuery } from '@server/app/shared';
import { CommentsParams } from './comments.params';

@Controller('comments/:category/:subcategory/:post_id')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param() commentsParams: CommentsParams,
    @Body() createCommentDto: CreateCommentDto,
    @Ip() ip: string
  ) {
    createCommentDto.ip = ip;
    createCommentDto.post = commentsParams.postId;
    return this.commentsService.create(commentsParams, createCommentDto);
  }

  // @Post(':id')
  // createChild(
  //   @Param() params: CommentsParams,
  //   @Body() createCommentDto: CreateCommentDto,
  //   @Ip() ip: string,
  // ) {
  //   createCommentDto.ip = ip;
  //   createCommentDto.post = params.postId;
  //   return this.commentsService.createChild(params, createCommentDto);
  // }

  @SerializeOptions({
    groups: [ValidationGroup.Delete],
  })
  @Get()
  list(@Param() commentsParams: CommentsParams, @Query() query: FindAllQuery) {
    return this.commentsService.list(commentsParams, query);
  }

  @Get(':id')
  get(@Param() commentsParams: CommentsParams) {
    return this.commentsService.get(commentsParams);
  }

  @Put(':id')
  update(
    @Param() commentsParams: CommentsParams,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.update(commentsParams, updateCommentDto);
  }

  @SerializeOptions({
    groups: [ValidationGroup.Delete],
  })
  @Delete(':id')
  delete(
    @Param() commentsParams: CommentsParams,
    @Body() deleteCommentDto: DeleteCommentDto
  ) {
    return this.commentsService.delete(commentsParams, deleteCommentDto);
  }
}
