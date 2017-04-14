import { Routes, RouterModule } from '@angular/router';

import { HubUserComponent } from './hub-user.component';

const routes: Routes = [
    {
        path: '',
        component: HubUserComponent,
        children: [
            { path: 'users', loadChildren: '../../modules/user-list/user-list.module#UserListModule' }
        ]
    }
];

export const HubUserRoutes = RouterModule.forChild(routes);