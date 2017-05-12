// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { TenantRolesRoutes } from './tenant-roles-routes.module';
// app > components
import { TenantRolesComponent } from './tenant-roles.component';

@NgModule({
    imports: [
        CommonModule,
        TenantRolesRoutes
    ],

    declarations: [
        TenantRolesComponent
    ],

})

export class TenantRolesModule { }