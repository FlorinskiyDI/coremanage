import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, createEpicMiddleware, combineEpics  } from 'redux-observable';
import { of } from 'rxjs/observable/of';

/* type */ import { UserActionTypes, UserActions  } from '../../../redux/actions/user.actions';
/* api-service */ import { UserProfileApiService } from '../../../common/services/api/entities/user-profile.api.service';


@Injectable()
export class UserEpics {
    constructor(
        private http: Http,
        private userProfileApiService: UserProfileApiService,
        private userActions: UserActions
    ) {}

    public createEpic() {
        let epics =  combineEpics(
            // user-grid
            this.getRequestTenantMemberGridEpic(),
            // user-item
            this.getRequestUserItemCreateEpic(),
            this.postRequestUserItemCreateEpic(),
            this.getRequestUserItemUpdateEpic(),
            this.postRequestUserItemUpdateEpic(),            
            this.deleteUserItemEpic()
            );
        return createEpicMiddleware(epics);
    }

    // user-grid
    private getRequestTenantMemberGridEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.GET_REQUEST_USER_GRID)
            .switchMap((payload: any) => this.userProfileApiService.getPageData(payload.meta.data)
                .map(data  => this.userActions.getRequestUserGridSuccessAction(data, payload.meta))
                .catch( error => of(this.userActions.getRequestUserGridFailedAction(error))));
    }

    // user-item-create
    private getRequestUserItemCreateEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.GET_REQUEST_USER_ITEM_CREATE)
            .switchMap((payload: any) => this.userProfileApiService.getCreateData()
                .map(data  => this.userActions.getRequestUserItemCreateSuccessAction(data))
                .catch( error => of(this.userActions.getRequestUserItemCreateFailedAction(error))));
    }
    private postRequestUserItemCreateEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.POST_REQUEST_USER_ITEM_CREATE)
            .switchMap((payload: any) => this.userProfileApiService.create(payload.meta)
                .map(data  => this.userActions.postRequestUserItemCreateSuccessAction(data))
                .catch( error => of(this.userActions.postRequestUserItemCreateFailedAction(error))));
    }

    // user-item-update 
    private getRequestUserItemUpdateEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.GET_REQUEST_USER_ITEM_UPDATE)
            .switchMap((payload: any) => this.userProfileApiService.getUpdateData(payload.meta)
                .map(data  => this.userActions.getRequestUserItemUpdateSuccessAction(data))
                .catch( error => of(this.userActions.getRequestUserItemUpdateFailedAction(error))));
    }
    private postRequestUserItemUpdateEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.POST_REQUEST_USER_ITEM_UPDATE)
            .switchMap((payload: any) => this.userProfileApiService.create(payload.meta)
                .map(data  => this.userActions.postRequestUserItemUpdateSuccessAction(data))
                .catch( error => of(this.userActions.postRequestUserItemUpdateFailedAction(error))));
    }

    // user-item-delete
    private deleteUserItemEpic() {
        return (action$: any) => action$
            .ofType(UserActionTypes.DELETE_USER_ITEM)
            .switchMap((payload: any) => this.userProfileApiService.delete(payload.meta)
                .map(data  => this.userActions.deleteUserItemSuccessAction(data))
                .catch(error => of(this.userActions.deleteUserItemFailedAction(error))));
    }
}