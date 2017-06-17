import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../common/services/auth/auth.service';


// styles
// import './header.component.scss';



@Component({
    selector: 'workspace-header-component',
    templateUrl: 'workspace-header.component.html',
    styleUrls: ['./workspace-header.component.scss']
})

export class WorkspaceHeaderComponent {
    private tenantList$: Observable<any>;
    private tenant$: Observable<any>;

    constructor(
        private authService: AuthService,
        private router: Router,        
        private ngRedux: NgRedux<IAppState>
    ) { }

    ngOnInit() {
        this.tenantList$ = this.ngRedux.select(state => state.session.user.tenant_list);
        this.tenant$ = this.ngRedux.select(state => state.session.tenant);
        this.tenant$.subscribe((value: any) => {
            if (!value) {
                console.error('tenant not found!!!');
            }
        });
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    public reLogin(): void {
        this.authService.refreshToken();
    }
    
    public refreshToken(tenantName: string) {
        this.authService.refreshToken(tenantName);
    }
}
