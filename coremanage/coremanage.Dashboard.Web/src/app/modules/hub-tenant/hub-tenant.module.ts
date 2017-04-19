// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/primeng';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubTenantRoutes } from './hub-tenant-routes.module';
// app > components
import { HubTenantComponent } from './hub-tenant.component';
import { HubTenantNavbarComponent } from './hub-tenant-navbar/hub-tenant-navbar.component';
import { HubTenantSidebarComponent } from './hub-tenant-sidebar/hub-tenant-sidebar.component';
import { TenantDialogAddComponent } from './tenant-dialog-add/tenant-dialog-add.component';
// app > components > shared
// import { RefreshSelectTenantComponent } from '../../shared/index.components';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubTenantRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule
    ],    
    declarations: [
        HubTenantComponent,
        HubTenantNavbarComponent,
        HubTenantSidebarComponent,
        TenantDialogAddComponent
         // shared components
        // RefreshSelectTenantComponent
    ],
    providers:[
    ]
})

export class HubTenantModule { }