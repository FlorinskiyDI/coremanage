import { Routes, RouterModule } from '@angular/router';

import { HubTenantsComponent } from './hub-tenants.component';

const routes: Routes = [
    {
        path: '',
        component: HubTenantsComponent,
        // children: [
        //     { path: 'tenants', loadChildren: '../../modules/tenant-list/tenant-list.module#TenantListModule' },
        //     { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' }
        // ]
    }
];

export const HubTenantsRoutes = RouterModule.forChild(routes);