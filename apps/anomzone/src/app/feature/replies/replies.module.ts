import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '@client/app/shared';
import { ListComponent } from './list/list.component';
import { GetComponent } from './get/get.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, GetComponent, UpdateComponent],
  imports: [CommonModule, SharedModule],
  exports: [CreateComponent, ListComponent],
})
export class RepliesModule {}
