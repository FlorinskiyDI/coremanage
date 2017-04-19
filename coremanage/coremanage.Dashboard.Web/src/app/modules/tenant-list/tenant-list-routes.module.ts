import { Routes, RouterModule } from '@angular/router';

import { TenantListComponent } from './tenant-list.component';

const routes: Routes = [
    { path: '', component: TenantListComponent }
];

export const TenantListRoutes = RouterModule.forChild(routes);