import { Component } from '@angular/core';
import { NgRedux, select,  } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import 'rxjs/add/operator/map';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions } from "../../../redux/actions";
/* model */ import { PageData } from "../../../common/index.models";

@Component({
    selector: 'tenant-members-component',
    templateUrl: 'tenant-members.component.html'
})
export class TenantMembersComponent {
    // member grid options
    public members: Observable<any>;
    public membersTotal: Observable<number>;
    public membersPage: Observable<number>;
    public membersLoading: Observable<boolean>;
    // observables
    private memberGrid$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid);

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
    ) { }

    ngOnInit() {
        this.memberGrid$
            .map(data => { return data.toJS()})
            .subscribe(data => {
                this.members = data.items;
                this.membersTotal = data.totalItems;
                this.membersPage = data.pageNumber;
                this.membersLoading = data.loading;
            });
    }

    onMembersPageChanged(data: any) {

        let pageData: PageData = {
            TotalItemCount: 0,
            TotalPageCount: 0,
            PageNumber: data.first,
            PageLength: data.rows,
            // filterData: null,
            // sortData: data.multiSortMeta
        }
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(pageData));
    }

    onMembersItemDelete(dta: any){        
    }
}
