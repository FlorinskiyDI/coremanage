// external import
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
// app`s import
import { SessionActions } from '../../../redux/actions/session.actions';
import { LoginData, ReLoginData } from '../../index.models';
import { JwtDecodeService } from './jwt-decode.service';
import { IdentityApiService } from '../api/entities/identity.api.service';
import { ISession, IdentityState } from '../../../redux/store/session/session.types';
import { IAppState } from '../../../redux/store';

@Injectable()
export class AuthService {
    redirectUrl: string; // store the URL so we can redirect after logging in
    isLoggedIn = false;

    constructor(
        private jwtDecodeService: JwtDecodeService,
        private identityApiService: IdentityApiService,
        private sessionActions: SessionActions,
        private ngRedux: NgRedux<IAppState>
    ) { }

    public login(loginData: LoginData): Observable<any> {
        this.sessionActions.loginUser( );
        return this.identityApiService.get(loginData)
            .do(
                data => { this.loginSuccess(data); },
                error => { this.loginError(error); }
            );
    }

    // updating the token through refresh token (with claims)
    public refreshToken(
        tenant: string = this.ngRedux.getState().session.tenant
        ) {
        let data: ReLoginData = {
            refreshToken: this.ngRedux.getState().session.refresh_token,
            tenant: tenant
        };
        this.identityApiService.refresh(data)
            .subscribe(
                data => { this.loginSuccess(data); },
                error => { this.loginError(error); }
            );
    }

    public logout() {
        this.sessionActions.logoutUser();
    }

    private loginSuccess(data: any) {
        let decode = this.jwtDecodeService.decode(data.accessToken);
        // console.log('@LOG Decoded token' + decode);
        console.log('@LOG Decoded token - {0}', decode);
        let user: IdentityState = {
            firstName: decode.name,
            lastName: decode.family_name,
            userName: decode.sub,
            email: decode.email,
            role: decode.role,
            tenant_list: decode.tenant_list
        };
        let session: ISession = {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            user: user,
            hasError: false,
            isLoading: false,
            tenant: decode.tenant
        }
        this.sessionActions.loginUserSuccess(session);
    }

    private loginError(error: any) {
        this.sessionActions.loginUserError();
        console.error(error);
    }
}

