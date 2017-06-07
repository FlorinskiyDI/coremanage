// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfileEntity } from '../../../index.models';
import { CustomRequestOptions } from '../custom-request-options.service';
import { Observable } from 'rxjs/Rx';

// app`s import
import { BaseApiService } from '../base.api.service';

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
        return this.http.get(url, this.customRequestOptions.optionRequestAuth)
            .map((res: Response) => res.json());
            // .catch(this.handleError);
    }
}