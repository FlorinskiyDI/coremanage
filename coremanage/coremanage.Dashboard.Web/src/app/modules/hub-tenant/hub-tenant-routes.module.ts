import { Routes, RouterModule } from '@angular/router';

import { HubTenantComponent } from './hub-tenant.component';

const routes: Routes = [
    {
        path: '',
        component: HubTenantComponent,
        children: [
            { path: 'tenants', loadChildren: '../../modules/tenant-list/tenant-list.module#TenantListModule' },
            { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' }
        ]
    }
];

export const HubTenantRoutes = RouterModule.forChild(routes);