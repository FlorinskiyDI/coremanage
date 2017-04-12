import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { TenantSelectionComponent } from './tenant-selection/tenant-selection.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        children: [
            { path: '', component: TenantSelectionComponent }
            // { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule' }
        ]
    },
    
];

export const WelcomeRoutes = RouterModule.forChild(routes);