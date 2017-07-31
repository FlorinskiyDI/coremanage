import { Routes, RouterModule } from '@angular/router';

import { UserManageComponent } from './user-manage.component';

const routes: Routes = [
    { path: '', component: UserManageComponent }
];

export const UserManageRoutes = RouterModule.forChild(routes);