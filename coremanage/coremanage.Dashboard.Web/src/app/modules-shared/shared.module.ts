import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/primeng';

/* constant */ import { appConstant } from '../common/index.constants';
/* service */ import { JwtDecodeService } from '../common/services/auth/jwt-decode.service';
// /* service */ import { AuthService } from '../common/services/auth/auth.service';
/* api-service */ import { IdentityApiService } from '../common/services/api/entities/identity.api.service';
/* api-service */ import { CustomRequestOptions } from '../common/services/api/custom-request-options.service';
/* api-service */ import { TenantApiService } from '../common/services/api/entities/tenant.api.service';
/* api-service */ import { UserProfileApiService } from '../common/services/api/entities/user-profile.api.service';
/* api-service */ import { AccountApiService } from '../common/services/api/entities/account.api.service';
// /* guard-service */ import { AuthGuard } from '../common/services/guards/auth-guard.service';
/* action */ import { ACTION_PROVIDERS } from '../redux/actions';
/* action */ import { EPICS_PROVIDERS } from '../redux/store'


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
        // AuthGuard,
        JwtDecodeService,
        IdentityApiService,
        CustomRequestOptions,
        TenantApiService,
        UserProfileApiService,
        AccountApiService,
        // AuthService,
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
                // AuthGuard,
                TenantApiService,
                UserProfileApiService,
                JwtDecodeService,
                IdentityApiService,
                // AuthService,
                ACTION_PROVIDERS,
                EPICS_PROVIDERS
            ]
        };
    }
}