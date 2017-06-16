// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls

// app
import { LoginRoutingModule } from './login-routes.module';
import { SharedModule } from '../../../modules-shared/shared.module';
// app > components
import { LoginComponent } from './login.component';
// app > services

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
        // AuthService,
        // IdentityService
    ]
})

export class LoginModule { }