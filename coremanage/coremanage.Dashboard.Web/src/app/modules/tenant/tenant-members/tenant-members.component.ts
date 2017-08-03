import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { ConfirmationService, Message, Confirmation} from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions, LayoutActions } from "../../../redux/actions";
/* model */ import { PageData } from "../../../common/index.models";
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';


@Component({
    selector: 'tenant-members-component',
    templateUrl: 'tenant-members.component.html',
    providers: [ ConfirmationService ]
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
        this._initSubscribe();
    }

    public onPageChangedMembers(data: any) {
        let tenantId = this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id;
        let pageNumber = (data.first == 0 ? 0: data.first + 1) % data.rows + 1;
        let pageData: PageData = {
            totalItemCount: 0,
            totalPageCount: 0,
            pageNumber: pageNumber,
            pageLength: data.rows,
            // filterData: null,
            // sortData: data.multiSortMeta
        }
        
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberGridAction({
            data: pageData,
            tenantName: tenantId
        }));
    }
    public onDeleteMembersItem(data: any){
        let confirm: Confirmation = {
            message: 'Are you sure that you want to delete member?',
            accept: () => {
                let index = this.members.indexOf(data);
                this.members = this.members.filter((val: any,i: any) => i!=index);
                this.ngRedux.dispatch(this.tenantActions.deleteTenantMemberAction({
                    data: data.id,
                    tenantId: this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id
                }));
            },
            reject: () => console.log("reject")
        }
        this.confirmationService.confirm(confirm);
    }
    public showDialogMemberAdd() {
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.TENANT_MEMBER_ADD_TYPE,
            extraData: { }
        }));
    }

    private _initSubscribe(){
        this.memberGrid$
            .map(data => { return data.toJS()})
            .subscribe(data => {
                this.members = data.items;
                this.membersTotal = data.totalItems;
                this.membersPage = data.pageNumber;
                this.membersLoading = data.loading;
            });

        this.memberDelete$
            .map(data => data.toJS())
            .subscribe(
                (value: any) => {
                    if (value.data == null)
                        return;

                    if (!value.isError)
                    {
                        this.msgs = [{
                            severity:'info',
                            summary:'Confirmed',
                            detail:'Memeber was deleted successfully'
                        }];                        
                    }

                    if (value.isError)
                        console.log("Member delete is failure")
                    if (value.isLoading)
                        console.log("LOADING");
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
}
