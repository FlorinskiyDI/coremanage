import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule' },
            { path: 'dashboard', loadChildren: '../../modules/hub-dashboard/hub-dashboard.module#HubDashboardModule' },
            { path: 'tenant', loadChildren: '../../modules/hub-tenant/hub-tenant.module#HubTenantModule' },
            { path: 'user', loadChildren: '../../modules/hub-user/hub-user.module#HubUserModule' }
        ]
    }
];

export const WorkspaceRoutes = RouterModule.forChild(routes);