// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfileEntity } from '../../../index.models';
import { CustomRequestOptions } from '../custom-request-options.service';
import { Observable } from 'rxjs/Rx';

/* service */ import { BaseApiService } from '../base.api.service';

@Injectable()
export class UserProfileApiService extends BaseApiService<UserProfileEntity> {
    constructor(
        http: Http,
        customRequestOptions: CustomRequestOptions
    ) {
        super('api/UserProfile/', http, customRequestOptions);
    }

    
    getUserEmailListForAutoComplete(query: string ): Observable<any> {
        let url = this.apiServer + 'AutoComplete/' + query;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getCreateData( ): Observable<any> {
        let url = this.apiServer + 'GetCreateData/';
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    create( data: any ): Observable<any> {
        let url = this.apiServer + 'Create/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getUpdateData(data: any): Observable<any> {
        let url = this.apiServer + 'GetUpdateData/'+ data;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    update( data: any ): Observable<any> {
        let url = this.apiServer + 'Update/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    delete(userId: any){
        let url = this.apiServer + 'Delete/' + userId;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    
    getPageData(data: any){
        let url = this.apiServer + 'PageData/';
        let body = JSON.stringify(data);
        let options = this.customRequestOptions.getOptionRequestAuth();

        return this.http.post(url, body, options)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
}