import { Routes, RouterModule } from '@angular/router';

import { TenantComponent } from './tenant.component';

const routes: Routes = [
    {
        path: '',
        component: TenantComponent,
        // children: [
        //     { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule' }
        // ]
    }
];

export const TenantRoutes = RouterModule.forChild(routes);