import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { ListComponent } from './list/list.component';
import { CommentsComponent } from './comments.component';
import { SharedModule } from '@client/app/shared';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { GetComponent } from './get/get.component';
import { RepliesModule } from '../replies';

@NgModule({
  declarations: [ListComponent, CommentsComponent, CreateComponent, UpdateComponent, GetComponent],
  imports: [CommonModule, CommentsRoutingModule, SharedModule, RepliesModule],
  exports: [CommentsComponent],
})
export class CommentsModule {}
