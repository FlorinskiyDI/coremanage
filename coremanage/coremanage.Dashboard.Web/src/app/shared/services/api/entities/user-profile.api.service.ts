// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserProfileEntity } from "../../../index.models";
import { CustomRequestOptions } from '../custom-request-options.service';

// app`s import
import { BaseApiService } from '../base.api.service';

@Injectable()
export class UserProfileApiService extends BaseApiService<UserProfileEntity> {
    constructor(
        http: Http,       
        customRequestOptions: CustomRequestOptions
    ) {
        super("api/UserProfile/", http, customRequestOptions);
    }
}