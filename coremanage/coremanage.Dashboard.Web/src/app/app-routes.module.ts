import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* guard-service */ import { AuthGuard } from './common/services/guards/auth-guard.service';
/* service */ import { AuthService } from './common/services/auth/auth.service';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // lazy-loading
    { 
      path: 'workspace/:tenant',
      loadChildren: './modules-layouts/workspace/workspace.module#WorkspaceModule',
      // canActivate: [AuthGuard]
    },
    { path: '', loadChildren: './modules-layouts/welcome/welcome.module#WelcomeModule' },
    // { path: 'login', loadChildren: './modules/account/login/login.module#LoginModule' },
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
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule {
}
