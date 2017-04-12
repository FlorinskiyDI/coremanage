// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls

// app
import { LoginRoutingModule } from './login-routes.module';
import { SharedModule } from '../../../shared/index.modules';
// app > components
import { LoginComponent } from './login.component';
// app > services
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IdentityService } from '../../../shared/services/api/identity.service';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService,
        IdentityService
    ]
})

export class LoginModule { }