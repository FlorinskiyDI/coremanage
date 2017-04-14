import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hub-tenant-navbar-component',
    templateUrl: 'hub-tenant-navbar.component.html',
    styleUrls: ['./hub-tenant-navbar.component.scss'],
})

export class HubTenantNavbarComponent {
    tenantpach: string = "test-tenant-pach";  
}
