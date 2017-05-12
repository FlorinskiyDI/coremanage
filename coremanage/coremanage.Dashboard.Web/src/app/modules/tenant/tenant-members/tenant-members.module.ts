// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//app
import { SharedModule } from '../../../modules-shared/shared.module';
// app > routes
import { TenantMembersRoutes } from './tenant-members-routes.module';
// app > components
import { TenantMembersComponent } from './tenant-members.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        TenantMembersRoutes,
    ],

    declarations: [
        TenantMembersComponent
    ],

})

export class TenantMembersModule { }