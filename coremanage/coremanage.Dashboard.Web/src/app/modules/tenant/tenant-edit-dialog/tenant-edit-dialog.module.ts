// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule} from 'primeng/primeng';

/* component */ import { TenantEditDialogComponent } from './tenant-edit-dialog.component';
/* component */ import { TenantEditComponent } from './comp-tenant-edit/tenant-edit.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
    ],
    declarations: [
        TenantEditDialogComponent,
        TenantEditComponent
    ],
    exports: [
        TenantEditDialogComponent
    ]
})

export class TenantEditDialogModule { }