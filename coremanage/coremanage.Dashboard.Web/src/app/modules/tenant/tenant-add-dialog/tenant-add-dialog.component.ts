import { Component, Input, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* interface */ import { IModalDialog } from '../../../common/index.interfaces';
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';
/* action */ import { LayoutActions, TenantActions } from "../../../redux/actions";
/* state */ import { IAppState } from '../../../redux/store';

@Component({
    selector: 'tenant-add-dialog-component',
    templateUrl: 'tenant-add-dialog.component.html'
})
export class TenantAddDialogComponent implements OnInit {
    layoutModal$: Observable<any>
    dialogModal = true;
    dialogObj: IModalDialog = {
        modalType: ModalDialogTypes.ADD_TENANT_TYPE,
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

    ngOnInit() {
         this.layoutModal$.subscribe((value: any) => {
            let val = value.toJS();
           
            if (this.dialogObj.modalType == val.modalType && this.dialogObj.modalType != null) {
                this.dialogObj.isOpen = true;
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantItemCreateAction());
            } else {
                this.dialogObj.isOpen = false;
            }
        });
    }


    onHideDialog(cccc: any = null){
        console.log("Close dialog => " + this.dialogObj.modalType);
        this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction());
    }
}
