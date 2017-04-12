// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// external > controls
import { SidebarModule } from 'ng-sidebar';
import { RadioButtonModule } from 'primeng/primeng';

// app > routes
import { SharedModule } from '../../shared/modules/shared.module';
import { WelcomeRoutes } from './welcome-routes.module';
// app > components
import { WelcomeComponent } from './welcome.component';
import { WelcomeHeaderComponent } from './welcome-header/welcome-header.component';
import { WelcomeNavbarComponent } from './welcome-navbar/welcome-navbar.component';
import { TenantSelectionComponent } from './tenant-selection/tenant-selection.component';
// app > services
import { AuthService } from '../../shared/services/auth/auth.service';
import { IdentityService } from '../../shared/services/api/identity.service';



@NgModule({
    imports: [
        CommonModule,
        WelcomeRoutes,        
        SharedModule,
        // FormsModule,
        // controls
        SidebarModule,
        RadioButtonModule
    ],

    declarations: [
        WelcomeComponent,
        WelcomeHeaderComponent,
        WelcomeNavbarComponent,
        TenantSelectionComponent
    ],
    providers:[
        IdentityService,
        AuthService
    ]

})

export class WelcomeModule { }