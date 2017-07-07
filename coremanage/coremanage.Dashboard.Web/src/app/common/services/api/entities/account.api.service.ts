// external import
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from '../custom-request-options.service';
import { Observable } from 'rxjs/Rx';


/* service */ import { BaseApiService } from '../base.api.service';

@Injectable()
export class AccountApiService extends BaseApiService<any> {
    constructor(
        http: Http,
        requestOptions: CustomRequestOptions
    ) {
        super('api/Account/', http, requestOptions);
    }

    // postInvitation( data: string[] | string): Observable<any> {
    postInvitation( data: any, tenantId: any){
        let url = this.apiServer + 'InviteByEmail/';        
        let body = JSON.stringify(data);
        let options = this.customRequestOptions.getOptionRequestAuth();
        options.headers.append('tenant_id', tenantId);

        return this.http.post(url, body, options)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    UnsubscribeFromTenant(userId: any){
        let url = this.apiServer + 'UnsubscribeFromTenant/' + userId;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }


    getConfirmEmail(userId: any, token: any){
        let url = this.apiServer + 'ConfirmEmail/' + "?userid=" + userId + "&token=" + token;
        return this.http.get(url, this.customRequestOptions.getOptionRequest())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    postAccountRegistration(data: any){
        let url = this.apiServer + 'Register/';        
        let body = JSON.stringify(data);
        return this.http.post(url, body, this.customRequestOptions.getOptionRequest())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
}