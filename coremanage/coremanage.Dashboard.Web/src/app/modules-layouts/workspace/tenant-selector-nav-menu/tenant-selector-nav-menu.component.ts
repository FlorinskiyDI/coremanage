import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../common/services/auth/auth.service';

@Component({
    selector: 'tenant-selector-nav-menu-component',
    templateUrl: 'tenant-selector-nav-menu.component.html',
    styleUrls: ['./tenant-selector-nav-menu.component.scss']
})

export class TenantSelectorNavMenuComponent {
    private tenantList$: Observable<any>;
    private tenant$: Observable<any>;

    constructor(
        private authService: AuthService,
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

    public refreshToken(tenantName: string) {
        this.authService.refreshToken(tenantName);
    }
}
