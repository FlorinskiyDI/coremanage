// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubDashboardRoutes } from './hub-dashboard-routes.module';
// app > components
import { HubDashboardComponent } from './hub-dashboard.component';
import { HubDashboardNavbarComponent } from './hub-dashboard-navbar/hub-dashboard-navbar.component';
import { ManageDashboardComponent } from './manage-dashboard/manage-dashboard.component';
import { OverviewComponent } from './overview/overview.component';
// app > components > shared
// import { RefreshSelectTenantComponent } from '../../shared/index.components';

@NgModule({
    imports: [
        CommonModule,
        HubDashboardRoutes,
        SharedModule
    ],

    declarations: [
        HubDashboardComponent,
        HubDashboardNavbarComponent,
        ManageDashboardComponent,
        OverviewComponent,
        // shared components
        // RefreshSelectTenantComponent
    ],

})

export class HubDashboardModule { }