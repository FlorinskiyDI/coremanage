// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// external > controls

// app
import { ConfirmEmailRoutingModule } from './confirm-email-routes.module';
import { SharedModule } from '../../../modules-shared/shared.module';
// app > components
import { ConfirmEmailComponent } from './confirm-email.component';
// app > services

@NgModule({
    imports: [
        CommonModule,
        ConfirmEmailRoutingModule,
        SharedModule
    ],
    declarations: [
        ConfirmEmailComponent
    ],
    providers: [
        // AuthService,
        // IdentityService
    ]
})

export class ConfirmEmailModule { }