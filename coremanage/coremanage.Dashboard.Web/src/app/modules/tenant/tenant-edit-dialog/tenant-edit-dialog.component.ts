import { Component, Input, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* interface */ import { IModalDialog } from '../../../common/index.interfaces';
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';
/* action */ import { LayoutActions, TenantActions } from "../../../redux/actions";
/* state */ import { IAppState } from '../../../redux/store';

@Component({
    selector: 'tenant-edit-dialog-component',
    templateUrl: 'tenant-edit-dialog.component.html'
})
export class TenantEditDialogComponent implements OnInit {
    layoutModal$: Observable<any>
    dialogModal = true;
    dialogObj: IModalDialog = {
        modalType: ModalDialogTypes.EDIT_TENANT_TYPE,
        isOpen: false,
        extraData: null
    };

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,        
        private tenantActions: TenantActions,
    ){
        this.layoutModal$ = this.ngRedux.select(state=>state.layout.layoutModal);        
    }

    ngAfterViewInit() {
         this.layoutModal$.subscribe((value: any) => {
            let val = value.toJS();
           
            if (this.dialogObj.modalType == val.modalType && this.dialogObj.modalType != null) {
                this.dialogObj.isOpen = true;
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantItemUpdateAction(val.extraData.tenantId));
            } else {
                this.dialogObj.isOpen = false;
            }            
        });
    }


    ngOnInit() {
    
    }

    onHideDialog(cccc: any = null){
        console.log("Close dialog => " + this.dialogObj.modalType);
        this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction());
    }
}
