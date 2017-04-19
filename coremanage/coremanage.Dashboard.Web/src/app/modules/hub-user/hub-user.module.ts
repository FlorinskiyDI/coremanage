// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { HubUserRoutes } from './hub-user-routes.module';
// app > components
import { HubUserComponent } from './hub-user.component';
import { HubUserNavbarComponent } from './hub-user-navbar/hub-user-navbar.component';



@NgModule({
    imports: [
        CommonModule,
        HubUserRoutes,
        SharedModule,
        AngularSplitModule
    ],    
    declarations: [
        HubUserComponent,
        HubUserNavbarComponent        
    ],
    providers:[       
    ]

})

export class HubUserModule { }