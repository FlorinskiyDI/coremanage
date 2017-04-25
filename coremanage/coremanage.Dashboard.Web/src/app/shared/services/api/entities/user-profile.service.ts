// external import
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserProfileEntity } from "../../../index.models";

// app`s import
import { BaseApiService } from '../base-api.service';

@Injectable()
export class UserProfileService extends BaseApiService<UserProfileEntity> {
    constructor(
        http: Http
    ) {
        super("api/UserProfile/", http);
    }

}