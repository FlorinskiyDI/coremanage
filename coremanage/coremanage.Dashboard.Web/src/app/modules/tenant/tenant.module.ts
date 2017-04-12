// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/modules/shared.module';

// app > routes
import { TenantRoutes } from './tenant-routes.module';
// app > components
import { TenantComponent } from './tenant.component';



@NgModule({
    imports: [
        CommonModule,
        TenantRoutes,
        SharedModule
    ],    
    declarations: [
        TenantComponent        
    ],
    providers:[       
    ]

})

export class TenantModule { }