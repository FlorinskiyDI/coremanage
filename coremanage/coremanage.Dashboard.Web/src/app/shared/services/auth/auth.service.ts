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
                data => { this.loginSuccess(data); },
                error => { this.loginError(error); }
            );
    }

    public logout() {
        this.sessionActions.logoutUser();
    }

    private loginSuccess(data: any){
        let decode = this.jwtDecodeService.decode(data.accessToken);
        let user: IUserDto = {
            firstName: decode.firstName,
            lastName: decode.lastName,
            userName: decode.userName,
            email: decode.email,
            role: decode.role
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

