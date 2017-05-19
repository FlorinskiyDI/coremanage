import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule, DropdownModule} from 'primeng/primeng';


/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* component */ import { TenantAddDialogComponent } from './tenant-add-dialog.component';
/* component */ import { TenantAddComponent } from './comp-tenant-add/tenant-add.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DialogModule, ButtonModule, DropdownModule,
    ],
    declarations: [
        TenantAddComponent,
        TenantAddDialogComponent
    ],
    exports: [
        TenantAddDialogComponent
    ]
})

export class TenantAddDialogModule {
}