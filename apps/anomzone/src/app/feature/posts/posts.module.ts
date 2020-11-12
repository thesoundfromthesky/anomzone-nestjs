import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@client/app/shared';
import { ListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import { UpdateComponent } from './update/update.component';
import { CommentsModule } from '../comments';
import { NgxsModule } from '@ngxs/store';
import { CommentsState } from '@ngxs/lib/comments';
import { RepliesState } from '@ngxs/lib/replies';
import { PostsState } from '@ngxs/lib/posts';

@NgModule({
  declarations: [ListComponent, CreateComponent, GetComponent, UpdateComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    CommentsModule,
    NgxsModule.forFeature([PostsState, CommentsState, RepliesState]),
  ],
})
export class PostsModule {}
