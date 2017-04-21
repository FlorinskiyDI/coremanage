import { Routes, RouterModule } from '@angular/router';

import { HubOverviewDashboardComponent } from './hub-overview-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: HubOverviewDashboardComponent,
        // children: [
        //     { path: 'tenants', loadChildren: '../../modules/tenant-list/tenant-list.module#TenantListModule' },
        //     { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' }
        // ]
    }
];

export const HubOverviewDashboardRoutes = RouterModule.forChild(routes);