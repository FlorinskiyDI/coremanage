// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//app
import { SharedModule } from '../../shared/modules/shared.module';
import { TenantModalAddModule } from '../tenant-modal-add/tenant-modal-add.module';
// app > routes
import { TenantMembersRoutes } from './tenant-members-routes.module';
// app > components
import { TenantMembersComponent } from './tenant-members.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,        
        TenantMembersRoutes,
        TenantModalAddModule
    ],

    declarations: [
        TenantMembersComponent
    ],

})

export class TenantMembersModule { }