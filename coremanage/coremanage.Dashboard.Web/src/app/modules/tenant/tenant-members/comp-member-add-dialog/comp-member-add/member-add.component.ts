import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* api-service */ import { TenantApiService } from '../../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantCreateModel, tenantMemberAutocomplete } from '../../../../../common/index.models';
/* action */ import { TenantActions, LayoutActions } from "../../../../../redux/actions";
/* state */ import { IAppState } from '../../../../../redux/store';

@Component({
    selector: 'member-add-component',
    templateUrl: 'member-add.component.html'
})
export class MemberAddComponent implements OnInit {  
    public results: tenantMemberAutocomplete[];
    public texts: string[];
    private query: string;
    private memberCreate$ = this.ngRedux.select(state => state.tenant.tenantMember.memberCreate);

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private tenantActions: TenantActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        this.results = [];
        this.query = "";
    }

    ngOnInit() {
        this.memberCreate$
            .map(data => { return data.toJS()})
            .subscribe((data: any) => {
                if(data != null){
                    if(data.getMember != null){
                        this.initAutoComplete(data.getMember);
                        // this.results = data.getMember;
                        // this.results.unshift(this.query);
                    } else{
                        
                    }
                }
        }); 
    }
    
    search(event: any) {
        this.query = event.query;
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberCreateAction(event.query));          
    }

    private initAutoComplete(data: any) {
        this.results = [];     
        data.forEach((element: any) => {
            this.results.push({
                value: element,
                isValid: true,
                isActive: true
            } as tenantMemberAutocomplete)
        });
        this.results.unshift({
                value: this.query,
                isValid: true,
                isActive: false
            } as tenantMemberAutocomplete
        );

    }
}
