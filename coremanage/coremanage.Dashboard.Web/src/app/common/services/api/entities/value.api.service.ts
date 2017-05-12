// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Value } from "../../../index.models";
import { CustomRequestOptions } from '../custom-request-options.service';

// app`s import
import { BaseApiService } from '../base.api.service';

@Injectable()
export class ValueApiService extends BaseApiService<Value> {
    constructor(
        http: Http,        
        customRequestOptions: CustomRequestOptions
    ) {
        super("api/Values/", http, customRequestOptions);
    }

}