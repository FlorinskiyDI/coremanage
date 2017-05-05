import { Routes, RouterModule } from '@angular/router';

import { HubTenantsComponent } from './hub-tenants.component';

const routes: Routes = [
    {
        path: '',
        component: HubTenantsComponent,
        children: [
            { path: 'detail', loadChildren: '../../modules/tenant-detail/tenant-detail.module#TenantDetailModule' },
            { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' },
            { path: 'members', loadChildren: '../../modules/tenant-members/tenant-members.module#TenantMembersModule' }
        ]
    }
];

export const HubTenantsRoutes = RouterModule.forChild(routes);