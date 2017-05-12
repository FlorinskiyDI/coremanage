// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* component */ import { TenantEditDialogComponent } from './tenant-edit-dialog.component';
/* component */ import { TenantEditComponent } from './comp-tenant-edit/tenant-edit.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TenantEditDialogComponent,
        TenantEditComponent
    ]
})

export class TenantEditDialogModule { }