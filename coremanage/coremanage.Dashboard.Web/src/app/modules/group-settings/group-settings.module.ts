// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls
import { AngularSplitModule } from 'angular-split';

//app
import { SharedModule } from '../../shared/modules/shared.module';
// app > routes
import { GroupSettingsRoutes } from './group-settings-routes.module';
// app > components
import { GroupSettingsComponent } from './group-settings.component';
import { GroupSettingsNavbarComponent } from './group-settings-navbar/group-settings-navbar.component';



@NgModule({
    imports: [
        CommonModule,
        GroupSettingsRoutes,
        SharedModule,
        AngularSplitModule
    ],    
    declarations: [
        GroupSettingsComponent,
        GroupSettingsNavbarComponent        
    ],
    providers:[       
    ]

})

export class GroupSettingsModule { }