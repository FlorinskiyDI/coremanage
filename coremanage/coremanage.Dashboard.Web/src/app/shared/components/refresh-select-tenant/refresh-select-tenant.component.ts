import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'refresh-select-tenant-component',
    templateUrl: 'refresh-select-tenant.component.html',
    styleUrls: ['./refresh-select-tenant.component.scss'],
})

export class RefreshSelectTenantComponent {    
    // private tenantList$: Observable<string[]>;
    private appState: IAppState;    
    private tenantList$: Observable<any>;
    constructor(       
        private ngRedux: NgRedux<IAppState>
    ){
        
    }

    ngOnInit() {        
        this.tenantList$ = this.ngRedux.select(state=>state.session.user.tenant_list);
        this.tenantList$.subscribe((value: any) => {
            if (value) {
                console.log(value);
            }
        });
    }
    // 
    haveSubTopics(event: any): void {
        
    }
}
