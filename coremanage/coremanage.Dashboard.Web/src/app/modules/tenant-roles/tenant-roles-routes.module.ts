import { Routes, RouterModule } from '@angular/router';

import { TenantRolesComponent } from './tenant-roles.component';

const routes: Routes = [
    { path: '', component: TenantRolesComponent }
];

export const TenantRolesRoutes = RouterModule.forChild(routes);