import { appConstant } from '../common/index.constants';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { DialogModule } from 'primeng/primeng';

import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { JwtDecodeService } from '../common/services/auth/jwt-decode.service';
import { AuthService } from '../common/services/auth/auth.service';
import { IdentityApiService } from '../common/services/api/entities/identity.api.service';
import { CustomRequestOptions } from '../common/services/api/custom-request-options.service';
import { TenantApiService } from '../common/services/api/entities/tenant.api.service';
// Actions
import { ACTION_PROVIDERS } from '../redux/actions';
import { EPICS_PROVIDERS } from '../redux/store'


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        DialogModule
    ],
    declarations: [
    //    TemplateModalComponent
    ],
    exports: [
        // TemplateModalComponent,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        JwtDecodeService,
        IdentityApiService,
        CustomRequestOptions,
        TenantApiService,
        AuthService,
        ACTION_PROVIDERS,
        EPICS_PROVIDERS
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // CommonModule,
                CustomRequestOptions,
                TenantApiService,
                JwtDecodeService,
                IdentityApiService,
                AuthService,
                ACTION_PROVIDERS,
                EPICS_PROVIDERS
            ]
        };
    }
}