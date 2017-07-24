import { Component } from '@angular/core';
import { ConfirmationService, Message} from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { TenantActions } from "../../../redux/actions";
/* model */ import { PageData } from '../../../common/index.models';

@Component({
    selector: 'tenant-detail-component',
    templateUrl: 'tenant-detail.component.html',    
    providers: [ConfirmationService]
})
export class TenantDetailComponent {
    public msgs: Message[] = [];
    private itemDelete$ = this.ngRedux.select(state=>state.tenant.tenantItem.itemDelete);

    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
        private confirmationService: ConfirmationService
    ) { }


    ngOnInit() {
        
    }
    onTenantDelete(){
        this.itemDelete$
            .map(data => { return data.toJS()})
            .subscribe(data => {
                if(data.id != null && data.error == null ){
                    this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
                    console.log("Member is delete")
                    this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(null));
                }
            });
        let tenantId = this.ngRedux.getState().tenant.tenantTree.selectedNode.toJS().id;
        this.confirmDelete(tenantId);
    }
    confirmDelete(tenantId: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.ngRedux.dispatch(this.tenantActions.deleteTenantItemAction(tenantId));
                console.log(tenantId);
            },
            reject: () => {      
                console.log("False");
            }
        });
    }
}
