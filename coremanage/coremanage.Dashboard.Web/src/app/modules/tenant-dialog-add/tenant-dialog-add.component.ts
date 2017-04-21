import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../redux/store';

@Component({
    selector: 'tenant-dialog-add-component',
    templateUrl: 'tenant-dialog-add.component.html',
    styleUrls: ['./tenant-dialog-add.component.scss']
})
export class TenantDialogAddComponent {
    private isOpenTenantDialogAdd$: Observable<any>;    
    private canResizable: boolean = true;
    private display: boolean = false;

    constructor(      
        private ngRedux: NgRedux<IAppState>
    ){        
    }

    // display: boolean = false;
    showDialog() {
        this.display = true;
    }
    ngOnInit() {        
        this.isOpenTenantDialogAdd$ = this.ngRedux.select(state=>state.tenant.isOpenTenantDialogAdd);
                
        this.isOpenTenantDialogAdd$.subscribe((value: any) => {
            if (value) {
                this.display = true;
             }
        });        
    }

}
