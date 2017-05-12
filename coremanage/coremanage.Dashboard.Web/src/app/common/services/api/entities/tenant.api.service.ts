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

    getTenantTreeNode(
        tenantName: string
    ): Observable<any> {
        let url = this.apiServer + 'TreeNode/' + tenantName;
        return this.http.get(url, this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

}