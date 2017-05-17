import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, createEpicMiddleware, combineEpics  } from 'redux-observable';
import { of } from 'rxjs/observable/of';

/* type */ import { TenantActionTypes, TenantActions  } from '../../../redux/actions/tenant.actions';
/* service */ import { TenantApiService } from '../../../common/services/api/entities/tenant.api.service';

const BASE_URL = '/api';

@Injectable()
export class TenantEpics {
    constructor(
        private http: Http,
        private tenantApiService: TenantApiService,
        private tenantActions: TenantActions
    ) {}

    public createEpic() {
        let ccc =  combineEpics(
            this.createGetRequestTenantEpic(),
            this.createPostRequestTenantEpic()
            );
        return createEpicMiddleware(ccc);
    }

     private createGetRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_CREATE_ITEM)
            .switchMap((payload: any) => this.tenantApiService.getTenantCreate()
                .map(data  => this.tenantActions.requestTenantCreateItemSuccessAction(data))
                .catch( error => of(this.tenantActions.requestTenantCreateItemFailedAction(error))));
    }

    private createPostRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_CREATE_ITEM)
            .switchMap((payload: any) => this.tenantApiService.addTenantCreate(payload.meta)
                .map(data  => this.tenantActions.requestTenantCreateItemSuccessAction(data))
                .catch( error => of(this.tenantActions.requestTenantCreateItemFailedAction(error))));
    }
}