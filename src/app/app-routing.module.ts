import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'board', loadChildren: () => import('./board/board.module').then(m => m.BoardModule)},
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: 'homepage'
  },
  { 
    path: '**',
    redirectTo: '/not-found'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
