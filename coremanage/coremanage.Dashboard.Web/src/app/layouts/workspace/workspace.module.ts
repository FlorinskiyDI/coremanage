// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule } from '@angular/forms';

// external > controls
// import { SidebarModule } from 'ng-sidebar';

// app > routes
import { WorkspaceRoutes } from './workspace-routes.module';
// app > components
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceHeaderComponent } from './workspace-header/workspace-header.component';
import { TenantSelectorNavMenuComponent } from './tenant-selector-nav-menu/tenant-selector-nav-menu.component';
// app > services



@NgModule({
    imports: [
        CommonModule,
        WorkspaceRoutes,
        // SidebarModule,
        FormsModule,
        SharedModule
    ],

    declarations: [
        WorkspaceComponent,
        WorkspaceHeaderComponent,
        TenantSelectorNavMenuComponent                
    ],
    providers:[        
    ]

})

export class WorkspaceModule { }