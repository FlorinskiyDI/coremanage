import { Component } from '@angular/core';
import { Router } from '@angular/router';

// app
import { AuthService } from '../../../common/services/auth/auth.service';

// styles
// import './header.component.scss';



@Component({
    selector: 'workspace-header-component',
    templateUrl: 'workspace-header.component.html',
    styleUrls: ['./workspace-header.component.scss']
})

export class WorkspaceHeaderComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);
    }

     public reLogin(): void {
        this.authService.refreshToken();
    }
}
