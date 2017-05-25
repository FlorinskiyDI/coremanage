import { Routes, RouterModule } from '@angular/router';

import { HubUsersComponent } from './hub-users.component';

const routes: Routes = [
    {
        path: '',
        component: HubUsersComponent,
        children: [
            { path: 'list', loadChildren: '../../modules/user-list/user-list.module#UserListModule' },
            // { path: 'roles', loadChildren: '../../modules/tenant-roles/tenant-roles.module#TenantRolesModule' }
        ]
    }
];

export const HubUsersRoutes = RouterModule.forChild(routes);