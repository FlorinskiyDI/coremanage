// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import {
    DialogModule,
    TreeModule,
    ContextMenuModule,
    ButtonModule
} from 'primeng/primeng';

//app
import { SharedModule } from '../../shared/modules/shared.module';
import { TenantModalAddModule } from '../tenant-modal-add/tenant-modal-add.module';
// app > routes
import { HubTenantsRoutes } from './hub-tenants-routes.module';
// app > components
import { HubTenantsComponent } from './hub-tenants.component';
import { TreeSectionComponent } from './tree-section/tree-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubTenantsRoutes,
        SharedModule,
        AngularSplitModule,
        TenantModalAddModule,
        DialogModule, TreeModule, ContextMenuModule, ButtonModule// primeng controls       
    ],    
    declarations: [
        HubTenantsComponent,
        TreeSectionComponent,
        MainSectionComponent
    ],
    providers:[
    ]
})

export class HubTenantsModule { }