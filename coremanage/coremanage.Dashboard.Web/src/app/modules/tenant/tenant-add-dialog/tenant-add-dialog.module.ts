// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* component */ import { TenantAddDialogComponent } from './tenant-add-dialog.component';
/* component */ import { TenantAddComponent } from './comp-tenant-add/tenant-add.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TenantAddDialogComponent,
        TenantAddComponent
    ]
})

export class TenantAddDialogModule { }