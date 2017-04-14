// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubTenantRoutes } from './hub-tenant-routes.module';
// app > components
import { HubTenantComponent } from './hub-tenant.component';
import { HubTenantNavbarComponent } from './hub-tenant-navbar/hub-tenant-navbar.component';
// app > components > shared
// import { RefreshSelectTenantComponent } from '../../shared/index.components';



@NgModule({
    imports: [
        CommonModule,
        HubTenantRoutes,
        SharedModule,
        SharedModule
    ],    
    declarations: [
        HubTenantComponent,
        HubTenantNavbarComponent,
         // shared components
        // RefreshSelectTenantComponent
    ],
    providers:[       
    ]

})

export class HubTenantModule { }