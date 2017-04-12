import { appConstant } from '../index.constants';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { JwtDecodeService } from '../services/auth/jwt-decode.service';
// import { IdentityService } from '../services/api/identity.service';

// Actions
import { ACTION_PROVIDERS } from '../../redux/actions';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        JwtDecodeService,
        // IdentityService,
        ACTION_PROVIDERS
    ]    
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                JwtDecodeService,
                // IdentityService,
                ACTION_PROVIDERS
            ]
        };
    }
}