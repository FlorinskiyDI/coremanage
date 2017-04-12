// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/modules/shared.module';

// external > controls
import { SidebarModule } from 'ng-sidebar';

// app > routes
import { WorkspaceRoutes } from './workspace-routes.module';
// app > components
import { WorkspaceComponent } from './workspace.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
// app > services
import { AuthService } from '../../shared/services/auth/auth.service';
import { IdentityService } from '../../shared/services/api/identity.service';



@NgModule({
    imports: [
        CommonModule,
        WorkspaceRoutes,
        SidebarModule,
        SharedModule
    ],

    declarations: [
        WorkspaceComponent,
        SidebarComponent,
        HeaderComponent
    ],
    providers:[
        IdentityService,
        AuthService
    ]

})

export class WorkspaceModule { }