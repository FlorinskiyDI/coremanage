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
            this.getRequestTenantTreeNodesEpic(),
            this.createGetRequestTenantEpic(),
            this.createPostRequestTenantEpic(),
            this.updateGetRequestTenantEpic(),
            this.updatePostRequestTenantEpic()
            );
        return createEpicMiddleware(ccc);
    }


    // tenant-tree
    private getRequestTenantTreeNodesEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_TREE_NODE)
            .switchMap((payload: any) => this.tenantApiService.getTenantTreeNodes(payload.meta)
                .map(data  => this.tenantActions.requestTenantTreeNodesSuccessAction(data, payload.meta))
                .catch( error => of(this.tenantActions.requestTenantTreeNodesFailedAction(error))));
    }


    // tenant-item-create
    private createGetRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE)
            .switchMap((payload: any) => this.tenantApiService.getTenantCreate()
                .map(data  => this.tenantActions.getRequestTenantItemCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.getRequestTenantItemCreateFailedAction(error))));
    }
    private createPostRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE)
            .switchMap((payload: any) => this.tenantApiService.addTenantCreate(payload.meta)
                .map(data  => this.tenantActions.postRequestTenantItemCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.postRequestTenantItemCreateFailedAction(error))));
    }

    // tenant-item-update 
    private updateGetRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE)
            .switchMap((payload: any) => this.tenantApiService.getTenantUpdate(payload.meta)
                .map(data  => this.tenantActions.getRequestTenantItemUpdateSuccessAction(data))
                .catch( error => of(this.tenantActions.getRequestTenantItemUpdateFailedAction(error))));
    }
    private updatePostRequestTenantEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE)
            .switchMap((payload: any) => this.tenantApiService.addTenantUpdate(payload.meta)
                .map(data  => this.tenantActions.postRequestTenantItemUpdateSuccessAction(data))
                .catch( error => of(this.tenantActions.postRequestTenantItemUpdateFailedAction(error))));
    }
}