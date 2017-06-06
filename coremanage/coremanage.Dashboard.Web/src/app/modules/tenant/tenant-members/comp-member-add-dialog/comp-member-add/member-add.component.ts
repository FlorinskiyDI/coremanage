import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* service */ import { TenantApiService } from '../../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantCreateModel } from '../../../../../common/index.models';
/* action */ import { TenantActions, LayoutActions } from "../../../../../redux/actions";
/* state */ import { IAppState } from '../../../../../redux/store';

@Component({
    selector: 'member-add-component',
    templateUrl: 'member-add.component.html'
})
export class MemberAddComponent implements OnInit {    

    text: string;    
    results: string[];

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private tenantActions: TenantActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        this.results = ["a","ab","abc","abcd"];
    }

    ngOnInit() { }
    
    search(event) {
        this.results.push(event.query);

        console.log(event);
        // this.mylookupservice.getResults(event.query).then(data => {
        //     this.results = data;
        // });
    }
}
