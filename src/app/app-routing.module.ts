import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/menuprincipal',
    pathMatch: 'full'
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./pages/menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule)
  },
{
    path: 'calculoenergia',
    loadChildren: () => import('./pages/menuprincipal/calculoenergia/calculoenergia.module').then( m => m.CalculoenergiaPageModule)
  },

  
];

@NgModule({
  imports: [  
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
