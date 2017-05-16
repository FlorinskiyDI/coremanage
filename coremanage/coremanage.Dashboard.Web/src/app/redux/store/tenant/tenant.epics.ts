import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, createEpicMiddleware  } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/* type */ import { TenantActionTypes } from '../../../redux/actions/tenant.actions';
/* service */ import { TenantApiService } from '../../../common/services/api/entities/tenant.api.service';

const BASE_URL = '/api';

@Injectable()
export class TenantEpics {
    constructor(
        private http: Http,
        private tenantApiService: TenantApiService
    ) {}

    public createEpic() {
        return createEpicMiddleware(this.createLoadTenantItemEpic());
    }

     private createLoadTenantItemEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.LOAD_TENANT_ITEM)
            .mergeMap(({payload}: any) => {
                return this.tenantApiService.getTenantCreate()
                .map(result => ({
                    type: TenantActionTypes.LOAD_TENANT_ITEM_SUCCESS,
                    payload: result.json().meta
                }))
                .catch( error => Observable.of({
                    type: TenantActionTypes.LOAD_TENANT_ITEM_FAILURE
                }));
            });
    }
}