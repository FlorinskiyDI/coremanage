// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule, TreeModule, ContextMenuModule, ButtonModule } from 'primeng/primeng';

/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* module */ import { TenantEditDialogModule } from '../tenant-edit-dialog/tenant-edit-dialog.module';
/* module */ import { TenantAddDialogModule } from '../tenant-add-dialog/tenant-add-dialog.module';
/* route */ import { TenantRoutes } from './tenant-routes.module';
/* component */ import { TenantComponent } from './tenant.component';
/* component */ import { TenantManageComponent } from './comp-tenant-manage/tenant-manage.component';
/* component */ import { TenantTreeComponent } from './comp-tenant-tree/tenant-tree.component';

@NgModule({
    imports: [
        CommonModule,
        TenantRoutes,
        SharedModule,
        TenantEditDialogModule,
        TenantAddDialogModule,
        AngularSplitModule,
        DialogModule, TreeModule, ContextMenuModule, ButtonModule// primeng controls
    ],
    declarations: [
        TenantComponent,
        TenantTreeComponent,
        TenantManageComponent
    ],
    providers: [ ]
})

export class TenantModule { }