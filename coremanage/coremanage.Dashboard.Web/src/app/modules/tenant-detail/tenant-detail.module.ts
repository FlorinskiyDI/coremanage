// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { TenantDetailRoutes } from './tenant-detail-routes.module';
// app > components
import { TenantDetailComponent } from './tenant-detail.component';

@NgModule({
    imports: [
        CommonModule,
        TenantDetailRoutes
    ],

    declarations: [
        TenantDetailComponent
    ],

})

export class TenantDetailModule { }