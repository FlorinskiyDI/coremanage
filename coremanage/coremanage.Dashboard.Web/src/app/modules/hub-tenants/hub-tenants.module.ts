// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import {
    DialogModule,
    TreeModule    
} from 'primeng/primeng';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubTenantsRoutes } from './hub-tenants-routes.module';
// app > components
import { HubTenantsComponent } from './hub-tenants.component';
import { TenantTreeSectionComponent } from './tenant-tree-section/tenant-tree-section.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubTenantsRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule, TreeModule // primeng controls       
    ],    
    declarations: [
        HubTenantsComponent,
        TenantTreeSectionComponent
    ],
    providers:[
    ]
})

export class HubTenantsModule { }