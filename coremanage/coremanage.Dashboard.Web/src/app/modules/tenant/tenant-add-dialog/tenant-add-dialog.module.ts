// external
import { NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule} from 'primeng/primeng';

/* component */ import { TenantAddDialogComponent } from './tenant-add-dialog.component';
/* component */ import { TenantAddComponent } from './comp-tenant-add/tenant-add.component';

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
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