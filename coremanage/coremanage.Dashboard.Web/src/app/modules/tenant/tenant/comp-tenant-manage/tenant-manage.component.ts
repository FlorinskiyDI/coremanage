import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

/* action */ import { LayoutActions } from '../../../../redux/actions';
/* constant */ import { ModalDialogTypes } from '../../../../common/index.constants';

@Component({
    selector: 'tenant-manage-component',
    templateUrl: 'tenant-manage.component.html',
    styleUrls: ['./tenant-manage.component.scss']
})

export class TenantManageComponent implements OnInit {
    constructor(
        private layoutActions: LayoutActions
    ) {
    }

    // init component
    ngOnInit() {
    }

    showTenantEditDialog() {
        this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.EDIT_TENANT_TYPE,
            extraData: { }
        });
    }
}
