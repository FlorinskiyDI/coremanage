import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        children: [
            { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule' },
            { path: 'login', loadChildren: '../../modules/account/login/login.module#LoginModule' },
            { path: 'register', loadChildren: '../../modules/account/register/register.module#RegisterModule' }
        ]
    },
];

export const WelcomeRoutes = RouterModule.forChild(routes);