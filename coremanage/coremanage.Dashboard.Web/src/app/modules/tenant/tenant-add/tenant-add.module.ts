// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/primeng';

// app
import { SharedModule } from '../../shared/modules/shared.module';
// app > components
import { TenantAddComponent } from './tenant-add.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DialogModule, // primeng controls  
    ],

    declarations: [
        TenantAddComponent
    ],
    exports: [
        TenantAddComponent
    ]
})

export class TenantAddModule {
    
}