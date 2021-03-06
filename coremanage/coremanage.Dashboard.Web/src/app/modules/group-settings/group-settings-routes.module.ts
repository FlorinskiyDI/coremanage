import { Routes, RouterModule } from '@angular/router';

import { GroupSettingsComponent } from './group-settings.component';

const routes: Routes = [
    {
        path: '',
        component: GroupSettingsComponent,
        children: [
            { path: 'overview', loadChildren: '../../modules/hub-overview-settings/hub-overview-settings.module#HubOverviewSettingsModule' },
            { path: 'tenants', loadChildren: '../../modules/tenant/tenant/tenant.module#TenantModule' },
            { path: 'users', loadChildren: '../../modules/hub-users/hub-users.module#HubUsersModule' }
        ]
    }
];

export const GroupSettingsRoutes = RouterModule.forChild(routes);