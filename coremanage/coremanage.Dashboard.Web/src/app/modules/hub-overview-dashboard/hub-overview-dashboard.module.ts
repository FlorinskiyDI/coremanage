// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/primeng';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubOverviewDashboardRoutes } from './hub-overview-dashboard-routes.module';
// app > components
import { HubOverviewDashboardComponent } from './hub-overview-dashboard.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubOverviewDashboardRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule
    ],    
    declarations: [
        HubOverviewDashboardComponent    
    ],
    providers:[
    ]
})

export class HubOverviewDashboardModule { }