import { Component } from '@angular/core';
import { NgRedux, select,  } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions } from "../../../redux/actions";

@Component({
    selector: 'tenant-members-component',
    templateUrl: 'tenant-members.component.html'
})
export class TenantMembersComponent {
    // @select(state => state.tenant.tenantMember.memberGrid.items) members$: Observable<any>;
    // public members$: Observable<any>;
    public membersTotal$: Observable<number>;
    public membersPage$: Observable<number>;
    public membersLoading$: Observable<boolean>;
    @select('memberGrid') memberGrid$: Observable<Map<string, any>>;



    public entities: any[];

    // @select(['tenant','tenantMember','memberGrid','pageNumber']) pageNumber$: Observable<number>;
    @select(['tenant','tenantMember','memberGrid']) members$: Observable<Map<string, any>>;
    @select(['tenant','tenantMember','memberGrid', 'items']) items$: Observable<any>;

    // @select(state => state.tenant.tenantMember.memberGrid.item) items$: Observable<number>;
    // @select(state => state.tenant.tenantMember.memberGrid) memberGrid$: Observable<Map<string, any>>;

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
    ) {
        // this.memberGrid$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid);

        this.items$.subscribe((counts) => {
            // var ccc =  counts.toArray();
            this.entities = counts.toArray();
            // return ccc;
        });
        //  = this.ngRedux
        //     .map(c => c.)
        //     .select(state => state.tenant.tenantMember.memberGrid.items)
            
        // this.membersTotal$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.totalItems);
        // this.membersPage$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.pageNumber);
        // this.membersLoading$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid.loading);
        

        // this.memberGrid$.subscribe(counts => {
        //     var ccc1  = counts.get('items');
        //     var ccc2 = ccc1.toJS();
        //     return ccc2;
        // });
        
        this.memberGrid$.map((counts: Map<string, any>) => {  
            // this.members$ = counts.get('memberGrid');
            var ccc = counts.get('pageNumber') + 5;
            return ccc;
        });
        // this.members$.subscribe(counts => { 
        //         var ccc = counts.toJS()
        //         return ccc;                
        //     // .subscribe((value: any) => {                     
        //     //  console.log(value);
        // });
    }

    ngOnInit() {        
        // this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(1));
    }

    onMembersPageChanged(data: any) {
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(data.first));
  }
}
