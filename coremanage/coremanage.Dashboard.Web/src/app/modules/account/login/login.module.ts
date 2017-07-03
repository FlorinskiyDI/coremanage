// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls

// app
import { LoginRoutingModule } from './login-routes.module';
import { SharedModule } from '../../../modules-shared/shared.module';
// app > components
import { LoginComponent } from './login.component';
/* service */ import { AuthService } from '../../../common/services/auth/auth.service';
/* guard-service */ import { AuthGuard } from '../../../common/services/guards/auth-guard.service';
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
        // AuthGuard,
        // AuthService
    ]
})

export class LoginModule { }