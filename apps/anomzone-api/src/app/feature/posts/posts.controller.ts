import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  SerializeOptions,
  Query,
  Ip,
} from '@nestjs/common';

import { FindAllQuery } from '@server/app/shared';
import { CreatePostDto } from './create-post.dto';
import { DeletePostDto } from './delete-post.dto';
import { PostsParams } from './posts.params';
import { UpdatePostDto } from './update-post.dto';
import { PostsService } from './posts.service';
import { ValidationGroup } from '@config/index';

@Controller('posts/:category/:subcategory')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Param() postsParams: PostsParams,
    @Body() createPostDto: CreatePostDto,
    @Ip() ip: string
  ) {
    createPostDto.ip = ip;
    return this.postsService.create(postsParams, createPostDto);
  }

  @Get()
  list(@Param() postsParams: PostsParams, @Query() query: FindAllQuery) {
    return this.postsService.list(postsParams, query);
  }

  @Get(':id')
  get(@Param() postsParams: PostsParams) {
    return this.postsService.get(postsParams);
  }

  @Put(':id')
  update(
    @Param() postsParams: PostsParams,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(postsParams, updatePostDto);
  }

  @SerializeOptions({
    groups: [ValidationGroup.Delete],
  })
  @Delete(':id')
  delete(
    @Param() postsParams: PostsParams,
    @Body() deletePostDto: DeletePostDto
  ) {
    return this.postsService.delete(postsParams, deletePostDto);
  }
}
