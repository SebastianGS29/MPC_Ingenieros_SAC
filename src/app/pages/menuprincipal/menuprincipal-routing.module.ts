import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuprincipalPage } from './menuprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: MenuprincipalPage
  
  },
  {
    path: 'calculoenergia',
    loadChildren: () => import('./calculoenergia/calculoenergia.module').then( m => m.CalculoenergiaPageModule)
  },
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuprincipalPageRoutingModule {}
