import { Routes, RouterModule } from '@angular/router';

import { HubOverviewSettingsComponent } from './hub-overview-settings.component';

const routes: Routes = [
    {
        path: '',
        component: HubOverviewSettingsComponent,
        // children: [
        //     { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' }
        // ]
    }
];

export const HubOverviewSettingsRoutes = RouterModule.forChild(routes);