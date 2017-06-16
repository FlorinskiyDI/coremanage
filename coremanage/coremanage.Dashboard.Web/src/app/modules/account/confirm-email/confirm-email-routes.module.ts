import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ConfirmEmailComponent } from './confirm-email.component';

const routes: Routes = [
    { path: '', component: ConfirmEmailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfirmEmailRoutingModule {
}