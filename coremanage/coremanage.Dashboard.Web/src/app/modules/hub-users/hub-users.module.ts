// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';
import { DialogModule } from 'primeng/primeng';

//app
import { SharedModule } from '../../modules-shared/shared.module';
// app > routes
import { HubUsersRoutes } from './hub-users-routes.module';
// app > components
import { HubUsersComponent } from './hub-users.component';
// app > services


@NgModule({
    imports: [
        CommonModule,
        HubUsersRoutes,
        SharedModule,
        AngularSplitModule,
        DialogModule
    ],
    declarations: [
        HubUsersComponent
    ],
    providers: [ ]
})

export class HubUsersModule { }