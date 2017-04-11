import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/index.modules';

import { LoginRoutingModule } from './login-routes.module';
import { LoginComponent } from './login.component';

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