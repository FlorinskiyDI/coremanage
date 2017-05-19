// external import
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from '../custom-request-options.service';
import { Observable } from 'rxjs/Rx';

// app`s import
import { BaseApiService } from '../base.api.service';

@Injectable()
export class TenantApiService extends BaseApiService<any> {
    constructor(
        http: Http,
        requestOptions: CustomRequestOptions
    ) {
        super('api/Tenant/', http, requestOptions);
    }

    getTenantTreeNodes(
        tenantname: string
    ): Observable<any> {
        let url = this.apiServer + 'TreeNode/' + tenantname;
        return this.http.get(url, this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getTenantCreate( ): Observable<any> {
        let url = this.apiServer + 'Create/';
        return this.http.get(url, this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    addTenantCreate( data: any ): Observable<any> {
        let url = this.apiServer + 'Create/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getTenantUpdate( ): Observable<any> {
        let url = this.apiServer + 'Update/';
        return this.http.get(url, this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    addTenantUpdate( data: any ): Observable<any> {
        let url = this.apiServer + 'Update/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

}