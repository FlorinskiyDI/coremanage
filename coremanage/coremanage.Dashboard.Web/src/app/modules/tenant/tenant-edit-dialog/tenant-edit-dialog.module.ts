// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule, DropdownModule} from 'primeng/primeng';

/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* component */ import { TenantEditDialogComponent } from './tenant-edit-dialog.component';
/* component */ import { TenantEditComponent } from './comp-tenant-edit/tenant-edit.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DialogModule, ButtonModule, DropdownModule,
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