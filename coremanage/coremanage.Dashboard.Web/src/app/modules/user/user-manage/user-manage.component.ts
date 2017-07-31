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
    selector: 'user-manage-component',
    templateUrl: 'user-manage.component.html'
})
export class UserManageComponent {


    
    constructor(
        private tenantActions: TenantActions,
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,
        private confirmationService: ConfirmationService
    ) { }
    
    public showDialogUserAdd() {
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.TENANT_MEMBER_ADD_TYPE,
            extraData: { }
        }));
    }
}
