// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { DashboardRoutes } from './dashboard-routes.module';
// app > components
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutes
    ],

    declarations: [
        DashboardComponent
    ],

})

export class DashboardModule { }