// external import
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from '../custom-request-options.service';
import { Observable } from 'rxjs/Rx';

/* service */ import { BaseApiService } from '../base.api.service';

@Injectable()
export class TenantApiService extends BaseApiService<any> {
    constructor(
        http: Http,
        requestOptions: CustomRequestOptions
    ) {
        super('api/Tenant/', http, requestOptions);
    }

    getTenantTreeNodes( tenantname: string ): Observable<any> {
        let url = this.apiServer + 'TreeNode/' + tenantname;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getTenantMemberList(data: any, tenantName: string){
        let url = this.apiServer + 'Member/PageData/';        
        let body = JSON.stringify(data);
        let options = this.customRequestOptions.getOptionRequestAuth();
        options.headers.append('tenant_id', tenantName);

        return this.http.post(url, body, options)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    
    postTenantMemberCreate( data: any ): Observable<any> {
        let url = this.apiServer + 'Member/Create/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getTenantCreate( ): Observable<any> {
        let url = this.apiServer + 'Create/';
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    addTenantCreate( data: any ): Observable<any> {
        let url = this.apiServer + 'Create/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    getTenantUpdate(data: any): Observable<any> {
        let url = this.apiServer + 'Update/'+ data;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
    addTenantUpdate( data: any ): Observable<any> {
        let url = this.apiServer + 'Update/';
        return this.http.post(url, JSON.stringify(data), this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }

    deleteTenantItem(tenantId: any){
        let url = this.apiServer + 'Delete/' + tenantId;
        return this.http.get(url, this.customRequestOptions.getOptionRequestAuth())
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
}