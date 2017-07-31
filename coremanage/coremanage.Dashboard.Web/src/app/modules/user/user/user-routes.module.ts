import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: 'manage', loadChildren: '../../../modules/user/user-manage/user-manage.module#UserManageModule' },
        ]
    }
];

export const UserRoutes = RouterModule.forChild(routes);