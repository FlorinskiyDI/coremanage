import { Component } from '@angular/core';
import { NgRedux, select,  } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import 'rxjs/add/operator/map';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions, LayoutActions } from "../../../redux/actions";
/* model */ import { PageData } from "../../../common/index.models";
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';


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
    private selectedNode$ = this.ngRedux.select(state=>state.tenant.tenantTree.selectedNode);

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,
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

        this.selectedNode$
            .map(data => { return data.toJS()})
            .subscribe((data: any) => {
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(new PageData()));
        });
    }

    onMembersPageChanged(data: any) {
        let pageNumber = data.first == 0 ? 0: data.first + 1;
        let pageData: PageData = {
            totalItemCount: 0,
            totalPageCount: 0,
            pageNumber: pageNumber % data.rows + 1,
            pageLength: data.rows,
            // filterData: null,
            // sortData: data.multiSortMeta
        }
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction(pageData));
    }

    onMembersItemDelete(data: any){
        this.ngRedux.dispatch(this.tenantActions.deleteTenantMemberAction(data.id));
        console.log(data);
    }

    showMemberAddDialog() {

        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.TENANT_MEMBER_ADD_TYPE,
            extraData: { }
        }));
    }
}
