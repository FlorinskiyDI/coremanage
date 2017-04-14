import { Routes, RouterModule } from '@angular/router';

import { UserLisComponent } from './user-list.component';

const routes: Routes = [
    { path: '', component: UserLisComponent }
];

export const UserLisRoutes = RouterModule.forChild(routes);