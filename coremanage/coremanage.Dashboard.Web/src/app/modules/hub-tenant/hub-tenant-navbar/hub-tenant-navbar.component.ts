import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TenantActions } from "../../../redux/actions/tenant.actions";

@Component({
    selector: 'hub-tenant-navbar-component',
    templateUrl: 'hub-tenant-navbar.component.html',
    styleUrls: ['./hub-tenant-navbar.component.scss'],
})

export class HubTenantNavbarComponent {
    tenantpach: string = "test-tenant-pach"; 

    constructor(
        private tenantActions: TenantActions,
    ){
    }

    showTenantDialogAdd() {
        this.tenantActions.openTenantDialogAdd(true);
    }
}
