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
import { SharedModule } from '../../../shared/modules/shared.module';
// app > routes
import { TenantRoutes } from './tenant-routes.module';
// app > components
import { TenantComponent } from './tenant.component';
import { SectionTenantManageComponent } from './component-section-tenant-manage/section-tenant-manage.component';
import { SectionTenantTreeComponent } from './component-section-tenant-tree/section-tenant-tree.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        TenantRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule, TreeModule, ContextMenuModule, ButtonModule// primeng controls       
    ],
    declarations: [
        TenantComponent,
        SectionTenantTreeComponent,
        SectionTenantManageComponent
    ],
    providers:[
    ]
})

export class TenantModule { }