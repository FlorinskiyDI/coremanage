// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls

// app
import { RegisterRoutingModule } from './register-routes.module';
import { SharedModule } from '../../../modules-shared/shared.module';
// app > components
import { RegisterComponent } from './register.component';
// app > services

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent
    ],
    providers: [
        // AuthService,
        // IdentityService
    ]
})

export class RegisterModule { }