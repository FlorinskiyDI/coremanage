// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/primeng';

// app
import { SharedModule } from '../../shared/modules/shared.module';
// app > components
import { TenantModalAddComponent } from './tenant-modal-add.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DialogModule, // primeng controls  
    ],

    declarations: [
        TenantModalAddComponent
    ],
    exports: [
        TenantModalAddComponent
    ]
})

export class TenantModalAddModule {
    
}