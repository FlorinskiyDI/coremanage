import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'workspace-navbar-component',
    templateUrl: 'workspace-navbar.component.html',
    styleUrls: ['./workspace-navbar.component.scss'],
})

export class WorkspaceNavbarComponent {
    tenantpach: string = "test-tenant-pach";  
}
