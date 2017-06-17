import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, createEpicMiddleware, combineEpics  } from 'redux-observable';
import { of } from 'rxjs/observable/of';

/* type */ import { AccountActionTypes, AccountActions  } from '../../../redux/actions/account.actions';
/* api-service */ import { AccountApiService } from '../../../common/services/api/entities/account.api.service';

const BASE_URL = '/api';

@Injectable()
export class AccountEpics {
    constructor(
        private http: Http,      
        private accountApiService: AccountApiService,
        private accountActions: AccountActions
    ) {}

    public createEpic() {
        let ccc =  combineEpics(
            // account-confirm-email
            this.postRequestAccountConfirmEmailEpic(),
            this.postRequestAccountRegistrationEpic(),      
        );
        return createEpicMiddleware(ccc);
    }


    /* account-confirm-email */
    private postRequestAccountConfirmEmailEpic() {
        return (action$: any) => action$
            .ofType(AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL)
            .switchMap((payload: any) => this.accountApiService.getConfirmEmail(payload.meta.userId, payload.meta.token)
                .map(data  => this.accountActions.postRequestConfirmEmailSuccessAction(data))
                .catch( error => of(this.accountActions.postRequestConfirmEmailFailedAction(error))));
    }

    /* account-registration */
    private postRequestAccountRegistrationEpic() {
        return (action$: any) => action$
            .ofType(AccountActionTypes.POST_REQUEST_ACCOUNT_REGISTRATION)
            .switchMap((payload: any) => this.accountApiService.postAccountRegistration(payload.meta)
                .map(data  => this.accountActions.postRequestAccountRegistrationSuccessAction(data))
                .catch( error => of(this.accountActions.postRequestAccountRegistrationFailedAction(error))));
    }
}