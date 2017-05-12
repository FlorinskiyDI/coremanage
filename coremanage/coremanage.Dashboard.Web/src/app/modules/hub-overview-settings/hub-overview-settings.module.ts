// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/primeng';

//app
import { SharedModule } from '../../modules-shared/shared.module';
// app > routes
import { HubOverviewSettingsRoutes } from './hub-overview-settings-routes.module';
// app > components
import { HubOverviewSettingsComponent } from './hub-overview-settings.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubOverviewSettingsRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule
    ],
    declarations: [
        HubOverviewSettingsComponent
    ],
    providers: [ ]
})

export class HubOverviewSettingsModule { }