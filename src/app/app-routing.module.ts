import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/menuprincipal/calculoenergia',
    pathMatch: 'full'
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./pages/menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule)
  },


  
];

@NgModule({
  imports: [  
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
