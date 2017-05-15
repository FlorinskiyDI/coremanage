import { Component, Input, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* interface */ import { IModalDialog } from '../../../common/index.interfaces';
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';
/* action */ import { LayoutActions } from "../../../redux/actions";
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
        private layoutActions: LayoutActions
    ){
        this.layoutModal$ = this.ngRedux.select(state=>state.layout.layoutModal);
       
    }

    ngAfterViewInit() {
         this.layoutModal$.subscribe((value: any) => {
            let val = value.toJS();
            this.dialogObj.isOpen = (this.dialogObj.modalType == val.modalType && this.dialogObj.modalType != null) ? true : false;
            // if (this.dialogObj.modalType == val.modalType && this.dialogObj.modalType != null) {
            //     this.dialogObj.isOpen = true;
            // } else {
            //     this.dialogObj.isOpen = false;
            // }            
        });
    }

    ngOnInit() {
    
    }

    onHideDialog(cccc: any = null){
        console.log("Close dialog => " + this.dialogObj.modalType);
        this.layoutActions.closeLayoutModalAction();
    }
}
