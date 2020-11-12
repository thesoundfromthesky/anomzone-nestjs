import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, MiscellaneousRoutingModule],
})
export class MiscellaneousModule {}

