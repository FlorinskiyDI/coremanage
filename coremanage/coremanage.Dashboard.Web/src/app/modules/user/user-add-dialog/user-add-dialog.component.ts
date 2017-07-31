import { Component, Input, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* interface */ import { IModalDialog } from '../../../common/index.interfaces';
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';
/* action */ import { LayoutActions, UserActions } from "../../../redux/actions";
/* state */ import { IAppState } from '../../../redux/store';

@Component({
    selector: 'user-add-dialog-component',
    templateUrl: 'user-add-dialog.component.html'
})
export class UserAddDialogComponent implements OnInit {
    private layoutModal$: Observable<any>
    dialogModal = true;
    dialogObj: IModalDialog = {
        modalType: ModalDialogTypes.TENANT_ITEM_ADD_TYPE,
        isOpen: false,
        extraData: null
    };

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,
        private userActions: UserActions,
    ){
        this.layoutModal$ = this.ngRedux.select(state=>state.layout.layoutModal);        
    }

    ngOnInit() {
         this.layoutModal$.subscribe((value: any) => {
            let val = value.toJS();
           
            if (this.dialogObj.modalType == val.modalType && this.dialogObj.modalType != null) {
                this.dialogObj.isOpen = true;
                this.ngRedux.dispatch(this.userActions.getRequestUserItemCreateAction());
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
