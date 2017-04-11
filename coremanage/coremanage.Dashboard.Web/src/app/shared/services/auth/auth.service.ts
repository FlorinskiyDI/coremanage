// external import
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// app`s import
import { SessionActions } from "../../../redux/actions/session.actions";
import { LoginData, ReLoginData } from "../../index.models";
import { JwtDecodeService } from "./jwt-decode.service";
import { IdentityService } from "../api/identity.service";
import { ISessionDto, IUserDto } from "../../../redux/store/session/session.types";


@Injectable()
export class AuthService {
    redirectUrl: string; // store the URL so we can redirect after logging in
    isLoggedIn: boolean = false;

    constructor(
        private jwtDecodeService: JwtDecodeService,
        private identityService: IdentityService,
        private sessionActions: SessionActions
    ){
    }

    public login(loginData: LoginData): Observable<any>{

        this.sessionActions.loginUser();
        return this.identityService.get(loginData)
            .do(
                data => { this.loginSuccess(data); },
                error => { this.loginError(error); }
            );

        // let val = new ReLoginData();        
        // val.refreshToken = "SuperAdmin";
        // val.tenant = "SuperAdmin";
        // return this.identityService.refresh(val)
        //     .do(
        //         data => { this.loginSuccess(data); },
        //         error => { this.loginError(error); }
        //     );
    }

    public reLogin(reloginData: ReLoginData): Promise<any>{

        // this.sessionActions.loginUser();

        let val = new ReLoginData();
        val.refreshToken = "SuperAdmin";
        val.tenant = "SuperAdmin";
        return this.identityService.refresh(val)
            .then(
                data => {
                    this.loginSuccess(data);
                },
                error => {
                    this.loginError(error); }
            );
    }

    public logout() {
        this.sessionActions.logoutUser();
    }

    private loginSuccess(data: any){
        let decode = this.jwtDecodeService.decode(data.accessToken);
        // console.log("@LOG Decoded token" + decode);
        console.log("@LOG Decoded token - {0}", decode);
        let user: IUserDto = {
            firstName: decode.name,
            lastName: decode.family_name,
            userName: decode.sub,
            email: decode.email,
            role: decode.role,
            tenant_list: decode.tenant_list
        };
        let session: ISessionDto<IUserDto> = {
            token: data.accessToken,
            refresh_token: data.refreshToken,
            user: user,
            hasError: false,
            isLoading: false,
            tenant: decode.tenant
        }
        this.sessionActions.loginUserSuccess(session);
    }

    private loginError(error: any){
        this.sessionActions.loginUserError();
        console.error(error);
    }
}

