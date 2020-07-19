import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'editor', loadChildren: () => import('./core/editor/editor.module').then(m => m.EditorModule) },
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
