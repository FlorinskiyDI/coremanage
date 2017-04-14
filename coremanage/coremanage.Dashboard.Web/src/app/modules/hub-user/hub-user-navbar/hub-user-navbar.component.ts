import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'hub-user-navbar-component',
    templateUrl: 'hub-user-navbar.component.html',
    styleUrls: ['./hub-user-navbar.component.scss'],
})

export class HubUserNavbarComponent {
    tenantpach: string = "test-tenant-pach";  
}
