import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // lazy-loading
    { path: '', loadChildren: './layouts/workspace/workspace.module#WorkspaceModule' },
    // { path: '', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'login', loadChildren: './modules/unauthorized/login/login.module#LoginModule' },
    { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [   
  ]
})
export class AppRoutingModule {
  
}
