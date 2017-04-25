// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Value } from "../../../index.models";

// app`s import
import { BaseApiService } from '../base.api.service';

@Injectable()
export class ValueApiService extends BaseApiService<Value> {
    constructor(
        http: Http
    ) {
        super("api/Values/", http);
    }

}