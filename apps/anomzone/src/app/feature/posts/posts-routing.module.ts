import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Routes } from '@angular/router';
import { resolvePostsGet, resolvePostsList } from '@ngxs/lib/posts';
import { CreateComponent } from './create/create.component';
import { GetComponent } from './get/get.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

// I'm following firebase rules naming convention for component's name.
// Collection = more than one data
// Document = single data
export const postRoutes: Routes = [
  { path: '', component: ListComponent, ...resolvePostsList() },
  { path: 'write', component: CreateComponent },
  {
    path: ':id',
    component: GetComponent,
    ...resolvePostsGet(),
  },
  {
    path: ':id/edit',
    component: UpdateComponent,
    ...resolvePostsGet(),
  },
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
