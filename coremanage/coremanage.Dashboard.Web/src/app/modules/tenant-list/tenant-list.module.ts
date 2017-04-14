// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { TenantLisRoutes } from './tenant-list-routes.module';
// app > components
import { TenantLisComponent } from './tenant-list.component';

@NgModule({
    imports: [
        CommonModule,
        TenantLisRoutes
    ],

    declarations: [
        TenantLisComponent
    ],

})

export class TenantListModule { }