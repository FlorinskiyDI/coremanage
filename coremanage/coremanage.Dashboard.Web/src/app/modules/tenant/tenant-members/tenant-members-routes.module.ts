import { Routes, RouterModule } from '@angular/router';

import { TenantMembersComponent } from './tenant-members.component';

const routes: Routes = [
    { path: '', component: TenantMembersComponent }
];

export const TenantMembersRoutes = RouterModule.forChild(routes);