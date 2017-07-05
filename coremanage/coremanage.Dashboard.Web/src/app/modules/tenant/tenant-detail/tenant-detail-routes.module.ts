import { Routes, RouterModule } from '@angular/router';

import { TenantDetailComponent } from './tenant-detail.component';

const routes: Routes = [
    { path: '', component: TenantDetailComponent }
];

export const TenantDetailRoutes = RouterModule.forChild(routes);