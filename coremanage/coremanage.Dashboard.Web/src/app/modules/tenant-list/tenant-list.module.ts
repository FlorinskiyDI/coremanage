// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { TenantListRoutes } from './tenant-list-routes.module';
// app > components
import { TenantListComponent } from './tenant-list.component';

@NgModule({
    imports: [
        CommonModule,
        TenantListRoutes
    ],

    declarations: [
        TenantListComponent
    ],

})

export class TenantListModule { }