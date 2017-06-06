// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, ButtonModule, DialogModule, AutoCompleteModule } from 'primeng/primeng';


/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* routes */ import { TenantMembersRoutes } from './tenant-members-routes.module';
/* component */ import { TenantMembersComponent } from './tenant-members.component';
/* component */ import { MembersGridComponent } from './comp-members-grid/members-grid.component';
/* component */ import { MemberAddDialogComponent } from './comp-member-add-dialog/member-add-dialog.component';
/* component */ import { MemberAddComponent } from './comp-member-add-dialog/comp-member-add/member-add.component';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        TenantMembersRoutes,
        ButtonModule, DataTableModule, DialogModule, AutoCompleteModule // primeng
    ],

    declarations: [
        TenantMembersComponent,
        MembersGridComponent,
        MemberAddDialogComponent,
        MemberAddComponent
    ],

})

export class TenantMembersModule { }