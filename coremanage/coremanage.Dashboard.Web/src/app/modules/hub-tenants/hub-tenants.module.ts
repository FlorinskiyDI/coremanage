// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/primeng';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubTenantsRoutes } from './hub-tenants-routes.module';
// app > components
import { HubTenantsComponent } from './hub-tenants.component';
import { TenantListSectionComponent } from './tenant-list-section/tenant-list-section.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubTenantsRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule
    ],    
    declarations: [
        HubTenantsComponent,
        TenantListSectionComponent
    ],
    providers:[
    ]
})

export class HubTenantsModule { }