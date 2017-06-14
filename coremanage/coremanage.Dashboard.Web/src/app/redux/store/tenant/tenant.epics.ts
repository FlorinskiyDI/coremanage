import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, createEpicMiddleware, combineEpics  } from 'redux-observable';
import { of } from 'rxjs/observable/of';

/* type */ import { TenantActionTypes, TenantActions  } from '../../../redux/actions/tenant.actions';
/* api-service */ import { TenantApiService } from '../../../common/services/api/entities/tenant.api.service';
/* api-service */ import { UserProfileApiService } from '../../../common/services/api/entities/user-profile.api.service';
/* api-service */ import { AccountApiService } from '../../../common/services/api/entities/account.api.service';

const BASE_URL = '/api';

@Injectable()
export class TenantEpics {
    constructor(
        private http: Http,
        private tenantApiService: TenantApiService,
        private userProfileApiService: UserProfileApiService,        
        private accountApiService: AccountApiService,
        private tenantActions: TenantActions
    ) {}

    public createEpic() {
        let ccc =  combineEpics(

            this.getRequestTenantTreeNodesEpic(),
            // tenant-item
            this.getRequestTenantItemCreateEpic(),
            this.postRequestTenantItemCreateEpic(),
            this.getRequestTenantItemUpdateEpic(),
            this.postRequestTenantItemUpdateEpic(),
            // tenant-grid
            this.getRequestTenantMemberGridEpic(),
            // tenant-member
            this.getRequestTenantMemberCreateEpic(),
            this.postRequestTenantMemberCreateEpic()
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

    // tenant-member-grid
    private getRequestTenantMemberGridEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_MEMBER_GRID)
            .switchMap((payload: any) => this.tenantApiService.getTenantMemberList(payload.meta)
                .map(data  => this.tenantActions.getRequestTenantMemberGridSuccessAction(data, payload.meta))
                .catch( error => of(this.tenantActions.getRequestTenantMemberGridFailedAction(error))));
    }
    // tenant-member-create
    private getRequestTenantMemberCreateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_MEMBER_CREATE)
            .switchMap((payload: any) => this.userProfileApiService.getUserEmailListForAutoComplete(payload.meta)
                .map(data  => this.tenantActions.getRequestTenantMemberCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.getRequestTenantMemberCreateFailedAction(error))));
    }
    private postRequestTenantMemberCreateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_MEMBER_CREATE)
            .switchMap((payload: any) => this.accountApiService.postInvitation(payload.meta)
                .map(data  => this.tenantActions.postRequestTenantMemberCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.postRequestTenantMemberCreateFailedAction(error))));
    }

    // tenant-item-create
    private getRequestTenantItemCreateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE)
            .switchMap((payload: any) => this.tenantApiService.getTenantCreate()
                .map(data  => this.tenantActions.getRequestTenantItemCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.getRequestTenantItemCreateFailedAction(error))));
    }
    private postRequestTenantItemCreateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE)
            .switchMap((payload: any) => this.tenantApiService.addTenantCreate(payload.meta)
                .map(data  => this.tenantActions.postRequestTenantItemCreateSuccessAction(data))
                .catch( error => of(this.tenantActions.postRequestTenantItemCreateFailedAction(error))));
    }

    // tenant-item-update 
    private getRequestTenantItemUpdateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE)
            .switchMap((payload: any) => this.tenantApiService.getTenantUpdate(payload.meta)
                .map(data  => this.tenantActions.getRequestTenantItemUpdateSuccessAction(data))
                .catch( error => of(this.tenantActions.getRequestTenantItemUpdateFailedAction(error))));
    }
    private postRequestTenantItemUpdateEpic() {
        return (action$: any) => action$
            .ofType(TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE)
            .switchMap((payload: any) => this.tenantApiService.addTenantUpdate(payload.meta)
                .map(data  => this.tenantActions.postRequestTenantItemUpdateSuccessAction(data))
                .catch( error => of(this.tenantActions.postRequestTenantItemUpdateFailedAction(error))));
    }
}