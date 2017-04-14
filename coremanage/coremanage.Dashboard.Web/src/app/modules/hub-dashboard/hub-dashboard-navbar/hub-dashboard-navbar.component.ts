import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({    
    selector: 'hub-dashboard-navbar-component',
    templateUrl: 'hub-dashboard-navbar.component.html',
    styleUrls: ['./hub-dashboard-navbar.component.scss'],
})

export class HubDashboardNavbarComponent {
    tenantpach: string = "test-tenant-pach";  
}
