// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* route */ import { TenantDetailRoutes } from './tenant-detail-routes.module';
/* component */ import { TenantDetailComponent } from './tenant-detail.component';

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