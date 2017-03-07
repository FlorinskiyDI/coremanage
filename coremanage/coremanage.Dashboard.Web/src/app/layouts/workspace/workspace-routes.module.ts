import { Routes, RouterModule } from '@angular/router';

import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule' }
        ]
    }
];

export const WorkspaceRoutes = RouterModule.forChild(routes);