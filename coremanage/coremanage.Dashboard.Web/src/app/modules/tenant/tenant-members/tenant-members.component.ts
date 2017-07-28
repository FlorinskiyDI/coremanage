import { Component } from '@angular/core';
import { NgRedux, select,  } from '@angular-redux/store';
import { ConfirmationService, Message} from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import 'rxjs/add/operator/map';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions, LayoutActions } from "../../../redux/actions";
/* model */ import { PageData } from "../../../common/index.models";
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';


@Component({
    selector: 'tenant-members-component',
    templateUrl: 'tenant-members.component.html',
    providers: [ConfirmationService]
})
export class TenantMembersComponent {
    // member grid options
    public msgs: Message[] = [];
    public selectedItem: any;
    public members: any;
    public membersTotal: Observable<number>;
    public membersPage: Observable<number>;
    public membersLoading: Observable<boolean>;
    // observables
    private memberGrid$ = this.ngRedux.select(state => state.tenant.tenantMember.memberGrid);
    private memberDelete$ = this.ngRedux.select(state => state.tenant.tenantMember.memberDelete);
    private selectedNode$ = this.ngRedux.select(state=>state.tenant.tenantTree.selectedNode);

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,
        private confirmationService: ConfirmationService
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

         this.memberDelete$
            .map(data => { return data.toJS()})
            .subscribe(data => {
                if(data.id != null && data.error == null ){
                    this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
                    console.log("Member is delete")
                }
            });

        this.selectedNode$
            .map(data => { return data.toJS()})
            .subscribe((data: any) => {
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction({
                    data: new PageData(),
                    tenantName: data.id
                }));
        });
    }

    onPageChangedMembers(data: any) {
        let pageNumber = data.first == 0 ? 0: data.first + 1;
        let pageData: PageData = {
            totalItemCount: 0,
            totalPageCount: 0,
            pageNumber: pageNumber % data.rows + 1,
            pageLength: data.rows,
            // filterData: null,
            // sortData: data.multiSortMeta
        }
        let tenantId = this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id;
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction({
                    data: pageData,
                    tenantName: tenantId
                }));
    }

    onDeleteMembersItem(data: any){        
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                let index = this.members.indexOf(data);
                this.members = this.members.filter((val: any,i: any) => i!=index);

                this.ngRedux.dispatch(this.tenantActions.deleteTenantMemberAction({
                    data: data.id,
                    tenantId: this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id
                }));
                console.log("True");
            },
            reject: () => {      
                console.log("False");
            }
        });
    }

    showDialogMemberAdd() {
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.TENANT_MEMBER_ADD_TYPE,
            extraData: { }
        }));
    }
}
