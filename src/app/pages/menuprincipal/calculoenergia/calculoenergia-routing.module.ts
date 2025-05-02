import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculoenergiaPage } from './calculoenergia.page';

const routes: Routes = [
  {
    path: '',
    component: CalculoenergiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculoenergiaPageRoutingModule {}
