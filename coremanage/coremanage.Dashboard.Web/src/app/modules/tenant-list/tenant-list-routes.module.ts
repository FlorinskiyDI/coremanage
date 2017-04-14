import { Routes, RouterModule } from '@angular/router';

import { TenantLisComponent } from './tenant-list.component';

const routes: Routes = [
    { path: '', component: TenantLisComponent }
];

export const TenantLisRoutes = RouterModule.forChild(routes);