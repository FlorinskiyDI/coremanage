// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/primeng';


/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* routes */ import { TenantMembersRoutes } from './tenant-members-routes.module';
/* component */ import { TenantMembersComponent } from './tenant-members.component';
/* component */ import { MembersGridComponent } from './comp-members-grid/members-grid.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        TenantMembersRoutes,
        DataTableModule // primeng
    ],

    declarations: [
        TenantMembersComponent,
        MembersGridComponent
    ],

})

export class TenantMembersModule { }