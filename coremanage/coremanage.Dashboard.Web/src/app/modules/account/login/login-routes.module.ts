import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

// export const LoginRoutes = RouterModule.forChild(routes);
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}