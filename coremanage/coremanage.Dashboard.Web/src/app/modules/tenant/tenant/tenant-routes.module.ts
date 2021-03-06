import { Routes, RouterModule } from '@angular/router';

import { TenantComponent } from './tenant.component';

const routes: Routes = [
    {
        path: '',
        component: TenantComponent,
        children: [
            { path: 'roles', loadChildren: '../../../modules/tenant/tenant-roles/tenant-roles.module#TenantRolesModule' },
            { path: 'members', loadChildren: '../../../modules/tenant/tenant-members/tenant-members.module#TenantMembersModule' }
        ]
    }
];

export const TenantRoutes = RouterModule.forChild(routes);