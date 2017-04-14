import { Routes, RouterModule } from '@angular/router';

import { HubDashboardComponent } from './hub-dashboard.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    { 
        path: '',
        component: HubDashboardComponent,
        children: [
            { path: 'overview', component: OverviewComponent }            
        ]
    },
];

export const HubDashboardRoutes = RouterModule.forChild(routes);