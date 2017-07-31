import { Routes, RouterModule } from '@angular/router';

import { GroupSettingsComponent } from './group-settings.component';

const routes: Routes = [
    {
        path: '',
        component: GroupSettingsComponent,
        children: [
            { path: 'tenants', loadChildren: '../../modules/tenant/tenant/tenant.module#TenantModule' },
            { path: 'users', loadChildren: '../../modules/user/user/user.module#UserModule' }
        ]
    }
];

export const GroupSettingsRoutes = RouterModule.forChild(routes);