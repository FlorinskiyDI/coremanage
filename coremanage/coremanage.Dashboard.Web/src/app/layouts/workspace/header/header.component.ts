import { Component } from '@angular/core';
import './header.component.scss';

import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html'
    
})

export class HeaderComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);  
    }
}
