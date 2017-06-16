import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // lazy-loading
    { path: 'workspace/:tenant', loadChildren: './modules-layouts/workspace/workspace.module#WorkspaceModule' },
    { path: '', loadChildren: './modules-layouts/welcome/welcome.module#WelcomeModule' },
    // { path: 'login', loadChildren: './modules/account/login/login.module#LoginModule' },
    { path: 'confirm-email', loadChildren: './modules/account/confirm-email/confirm-email.module#ConfirmEmailModule' },
    // { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
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
