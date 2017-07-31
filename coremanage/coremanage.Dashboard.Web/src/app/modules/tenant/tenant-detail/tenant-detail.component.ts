import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, Message} from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';
import { Subscription } from "rxjs/Subscription";

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions } from "../../../redux/actions";
/* model */ import { PageData } from '../../../common/index.models';

@Component({
    selector: 'tenant-detail-component',
    templateUrl: 'tenant-detail.component.html',    
    providers: [ConfirmationService]
})

export class TenantDetailComponent implements OnDestroy, OnInit {
    
    public noticeList: Message[] = [];
    private tenantItemDelete$ = this.ngRedux.select(state=>state.tenant.tenantItem.itemDelete);
    private tenantItemDelete: Subscription;

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit() {
        this._initSubscribe();
    }
    ngOnDestroy() {
        this.tenantItemDelete.unsubscribe();
    }


    public onDeleteTenantItem(){
        let tenantId = this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => { this.ngRedux.dispatch(this.tenantActions.deleteTenantItemAction(tenantId)); },
            reject: () => { console.log("False"); }
        });
    }

    private _initSubscribe(){
        this.tenantItemDelete = this.tenantItemDelete$
            .map(data => data.toJS())
            .subscribe(
                (value: any) => {
                    if (value.data == null)
                        return;

                    if (!value.isError)
                    {
                        this.noticeList = [{
                            severity:'info',
                            summary:'Confirmed',
                            detail:'Tenant  was deleted successfully'
                        }];
                        this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(null));
                    }

                    if (value.isError)
                        console.log("Tenant delete is failure")
                    if (value.isLoading)
                        console.log("LOADING");
                });
    }
}
