// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { TenantMembersRoutes } from './tenant-members-routes.module';
// app > components
import { TenantMembersComponent } from './tenant-members.component';

@NgModule({
    imports: [
        CommonModule,        
        TenantMembersRoutes
    ],

    declarations: [
        TenantMembersComponent
    ],

})

export class TenantMembersModule { }