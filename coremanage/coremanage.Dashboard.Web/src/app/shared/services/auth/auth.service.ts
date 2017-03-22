// external import
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// app`s import
import { SessionActions } from "../../../redux/actions/session.actions";
import { LoginData } from "../../index.models";
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
                data => {
                    let decodeToken = this.jwtDecodeService.decode(data.accessToken);
                    let tenant = this.getUserTenant(decodeToken.sub);
                    this.loginSuccess(data, decodeToken, tenant);
                },
                error => { this.loginError(error); }
            );
    }

    public logout() {
        this.sessionActions.logoutUser();
    }

    // get tanant data by user id
    private getUserTenant(id: string){
        return this.identityService.getTenant(id).do(
                data => { return data },
                error => { this.loginError(error); }
            );
    }

    private loginSuccess(data: any, decodeToken: any, tenant: any ){
        let user: IUserDto = {
            firstName: decodeToken.firstName,
            lastName: decodeToken.lastName,
            userName: decodeToken.userName,
            email: decodeToken.email,
            role: decodeToken.role
        };
        let session: ISessionDto<IUserDto> = {
            token: data.accessToken,
            user: user,
            hasError: false,
            isLoading: false
        }
        this.sessionActions.loginUserSuccess(session);
    }

    private loginError(error: any){
        this.sessionActions.loginUserError();
        console.error(error);
    }
}

