// external import
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

// app`s import
import { SessionActions } from '../../../redux/actions/session.actions';
import { LoginData, ReLoginData } from '../../index.models';
import { JwtDecodeService } from './jwt-decode.service';
import { IdentityApiService } from '../api/entities/identity.api.service';
import { ISession, IdentityState } from '../../../redux/store/session/session.types';
import { IAppState } from '../../../redux/store';
import { appLocalStorage } from '../../index.constants';

@Injectable()
export class AuthService {
    redirectUrl: string; // store the URL so we can redirect after logging in
    isLoggedIn = false;
    isRemember = false;

    constructor(
        private jwtDecodeService: JwtDecodeService,
        private identityApiService: IdentityApiService,
        private sessionActions: SessionActions,
        private ngRedux: NgRedux<IAppState>,
        private router: Router
    ) { }

    public login(loginData: LoginData): Observable<any> {
        this.sessionActions.loginUser( );
        return this.identityApiService.get(loginData)
            .do(
                data => {
                    this.isLoggedIn = true;
                    this.isRemember = loginData.isRemember;
                    this.loginSuccess(data);                    
                },
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
        localStorage.removeItem(appLocalStorage.authData);
        this.sessionActions.logoutUser();
    }

    public checkLogin(){
        let strageData = localStorage.getItem(appLocalStorage.authData);
        if(strageData != null)
        {
            this.sessionActions.loginUserSuccess(JSON.parse(strageData));
            this.isLoggedIn = true;
        }

        return this.isLoggedIn;
    }

    private loginSuccess(data: any) {
        let decode = this.jwtDecodeService.decode(data.accessToken);
        let session: ISession = {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            tenant: decode.tenant_name,
            user: {
                firstName: decode.name,
                lastName: decode.family_name,
                userName: decode.sub,
                email: decode.email,
                role: decode.role,
                tenant_list: decode.tenant_list
            },
            hasError: false,
            isLoading: false            
        }
        this.sessionActions.loginUserSuccess(session);        

        // save data in localStorage 
        if(this.isRemember){
            localStorage.setItem(appLocalStorage.authData, JSON.stringify(session));
        }     

        // redirect to route
        let redirect = this.redirectUrl ? this.redirectUrl : '/workspace/'+ decode.tenant_name +'/dashboard/overview';  
        this.router.navigate([redirect]);   
    }

    private loginError(error: any) {
        this.sessionActions.loginUserError();
        console.error(error);
    }
}

