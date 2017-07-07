// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ConfirmDialogModule, GrowlModule} from 'primeng/primeng';

/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* route */ import { TenantDetailRoutes } from './tenant-detail-routes.module';
/* component */ import { TenantDetailComponent } from './tenant-detail.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TenantDetailRoutes,
        ConfirmDialogModule, GrowlModule // primeng
    ],

    declarations: [
        TenantDetailComponent
    ],

})

export class TenantDetailModule { }