import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from 'primeng/primeng';

/* action */ import { LayoutActions } from '../../../../redux/actions';
/* constant */ import { ModalDialogTypes } from '../../../../common/index.constants';
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-manage-component',
    templateUrl: 'tenant-manage.component.html',
    styleUrls: ['./tenant-manage.component.scss']
})

export class TenantManageComponent implements OnInit {
    private selectedTenant$: Observable<any>
    private tenantName: string;
    private tenantId: number;
    private itemsManage: MenuItem[];
    constructor(
        private layoutActions: LayoutActions,
        private ngRedux: NgRedux<IAppState>,
    ) {
        this.selectedTenant$ = this.ngRedux.select(state=>state.tenant.tenantTree.selectedNode);
    }
    
    ngOnInit() {
        this.itemsManage = [
            { label: 'Edit tenant', command: (event) => { this.editTenant(event) } },
            { label: 'Delete', command: (event) => { this.deleteTenant(event) } }
        ]

        this.selectedTenant$.subscribe((value: any) => {
            let val = value.toJS();
            this.tenantName = val.label;
            this.tenantId = val.id;
            console.log(val);
        });
    }

    private editTenant(event: any){
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.TENANT_ITEM_EDIT_TYPE,
            extraData: { tenantId: this.tenantId }
        }));       
    }

    private deleteTenant(event: any){
        console.log("Delete");
        console.log(event);
    }
}
