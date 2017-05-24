import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* action */ import { LayoutActions } from '../../../../redux/actions';
/* constant */ import { ModalDialogTypes } from '../../../../common/index.constants';
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-manage-component',
    templateUrl: 'tenant-manage.component.html',
    styleUrls: ['./tenant-manage.component.scss']
})

export class TenantManageComponent implements OnInit {
    constructor(
        private layoutActions: LayoutActions,
        private ngRedux: NgRedux<IAppState>,
    ) {
    }

    // init component
    ngOnInit() {
    }

    showTenantEditDialog() {
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.EDIT_TENANT_TYPE,
            extraData: { }
        }));
    }
}
