import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            { path: 'dashboard', loadChildren: '../../modules/group-dashboard/group-dashboard.module#GroupDashboardModule' },
            { path: 'settings', loadChildren: '../../modules/group-settings/group-settings.module#GroupSettingsModule' }
        ]
    }
];

export const WorkspaceRoutes = RouterModule.forChild(routes);