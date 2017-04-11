import { Component } from '@angular/core';
import './header.component.scss';

import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ReLoginData } from "../../../shared/index.models";
import { Http, Response } from '@angular/http';

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html'
    
})

export class HeaderComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
        private http: Http
    ) {
    }

    ngOnInit() {

        this.http.get("http://localhost:5200/api/Values/")
            .do((res: Response) =>{
                let cc = res.json()
            console.log(cc);
            })
    }
    public logout(): void {
        // this.authService.logout();
        this.router.navigate(['login']);  
    }

     public reLogin(): void{
        // статический пример!!!!!
        let data = new ReLoginData();
        data.refreshToken = '11111';
        data.tenant = 'company_test';

        this.authService.reLogin(data);
    }
}
