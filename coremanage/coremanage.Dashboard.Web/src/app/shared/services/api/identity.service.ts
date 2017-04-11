// external import
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { NgRedux, select } from '@angular-redux/store';

// app`s import
import { LoginData, ReLoginData } from "../../index.models";
import { appConstant } from "../../index.constants";

@Injectable()
export class IdentityService {    
    protected apiServer: string;

    constructor(protected http: Http) {
        this.apiServer = appConstant.apiServer;
    }

    // retern token
    get( loginData: LoginData ): Observable<any> {
        return this.http.post(this.apiServer + "api/Identity", JSON.stringify(loginData))
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    refresh(reLoginData: ReLoginData): Promise<any>{

        let val = new LoginData();
        val.isRemember = false;
        val.password = "SuperAdmin";
        val.userName = "SuperAdmin";
       
        let body = JSON.stringify(val);
        // return this.http.post(this.apiServer + "api/Identity", body)
        //     .map( (res: Response) => {
        //        return res.json()
        //     })
        //     .catch(this.handleError);
        return this.http.post(this.apiServer + "api/Identity", body)
             .toPromise()
             .then( (res: Response) => {
               return res.json()
             })
             .catch(this.handleError);
    }

    getTenant(id: string): Observable<any> {
        return this.http.get(this.apiServer + "api/Identity/Tenant/" + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }   
    
}

