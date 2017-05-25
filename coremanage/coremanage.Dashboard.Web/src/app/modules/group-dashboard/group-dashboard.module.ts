// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app
import { SharedModule } from '../../modules-shared/shared.module';
// app > routes
import { GroupDashboardRoutes } from './group-dashboard-routes.module';
// app > components
import { GroupDashboardComponent } from './group-dashboard.component';
import { GroupDashboardNavbarComponent } from './group-dashboard-navbar/group-dashboard-navbar.component';

@NgModule({
    imports: [
        CommonModule,
        GroupDashboardRoutes,
        SharedModule
    ],

    declarations: [
        GroupDashboardComponent,
        GroupDashboardNavbarComponent,
    ],

})

export class GroupDashboardModule { }