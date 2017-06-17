import {Router, ActivatedRoute, Params} from '@angular/router';
import {OnInit, OnDestroy, Component} from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

/* constant */ import { QueryParamsConfirmEmail } from '../../../common/index.constants';
/* action */ import { AccountActions } from "../../../redux/actions";
/* state */ import { IAppState } from '../../../redux/store';

@Component({
    selector: 'confirm-email-component',
    templateUrl: 'confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})

export class ConfirmEmailComponent implements OnInit {    
    private accountConfirmEmail$ = this.ngRedux.select(state => state.account.accountConfirmEmail);
    
    public isLading = true;
    public isConfirmedEmail = false;
    
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountActions: AccountActions
    ) {

    }

    ngOnInit() {
        this.isLading = true;
        let id = this.activatedRoute.snapshot.queryParams[QueryParamsConfirmEmail.userId];
        let token = this.activatedRoute.snapshot.queryParams[QueryParamsConfirmEmail.token];
        if(id != null && token != null && id != undefined && token != undefined){
            this.ngRedux.dispatch(this.accountActions.postRequestConfirmEmailAction({
                userId: id,
                token: token
            }));
        }

        this.accountConfirmEmail$
            .map(data => { return data.toJS()})
            .subscribe((data: any) => {
                if(data != null){
                    this.isLading = data.loading;
                    this.isConfirmedEmail  = data.error == null ? true : false;
                }
        });  
    }
}
