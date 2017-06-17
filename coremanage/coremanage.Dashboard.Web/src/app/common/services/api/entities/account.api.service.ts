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
    postInvitation( data: any): Observable<any> {
        let url = this.apiServer + 'Invitation/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getConfirmEmail(userId: any, token: any){
        let url = this.apiServer + 'ConfirmEmail/' + "?userid=" + userId + "&token=" + token;
        return this.http.get(url, this.customRequestOptions.optionRequest)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    postAccountRegistration(data: any){
        let url = this.apiServer + 'Register/';        
        let body = JSON.stringify(data);
        return this.http.post(url, body, this.customRequestOptions.optionRequest)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
}