import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions } from "../../../redux/actions";

@Component({
    selector: 'tenant-members-component',
    templateUrl: 'tenant-members.component.html'
})
export class TenantMembersComponent {
    public members$: Observable<any>;
    public membersTotal$: Observable<number>;
    public membersPage$: Observable<number>;
    public membersLoading$: Observable<boolean>;

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
    ) {
        this.members$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.items);
        this.membersTotal$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.totalItems);
        this.membersPage$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.pageNumber);
        this.membersLoading$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.loading);
    }

    ngOnInit() {        
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(1));
    }

    onGamesPageChanged(page:number) {
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(page))
  }
}
