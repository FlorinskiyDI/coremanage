import { Routes, RouterModule } from '@angular/router';

import { GroupDashboardComponent } from './group-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: GroupDashboardComponent,
        children: [
             { path: 'overview', loadChildren: '../../modules/hub-overview-dashboard/hub-overview-dashboard.module#HubOverviewDashboardModule' },
        ]
    },
];

export const GroupDashboardRoutes = RouterModule.forChild(routes);