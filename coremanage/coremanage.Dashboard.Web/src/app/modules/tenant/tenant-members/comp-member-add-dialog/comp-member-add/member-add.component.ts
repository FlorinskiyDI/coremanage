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
    private memberCreate$ = this.ngRedux.select(state => state.tenant.tenantMember.memberCreate);
    private autocompleteQuery: string;
    public autocompleteResult: any;
    public autocompleteOption: any;
    formMember: FormGroup;
    formErrors: any = { 'users': '' };
    validationMessages: any = { 'users': { 'required': 'Users is required.' } };
        
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private tenantActions: TenantActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        // this.autocomplete.results = [];
        this.autocompleteQuery = "";
        this.autocompleteOption = { results: [] as any[], texts: [] as any[] }
    }

    ngOnInit() {
        this.buildForm();
        this.memberCreate$
            .map(data => { return data.toJS()})
            .subscribe((data: any) => {
                if(data != null){
                    if(data.getMember != null){
                        this.initAutoComplete(data.getMember);
                        // this.results = data.getMember;
                        // this.results.unshift(this.autocompleteQuery);
                    } else{
                        
                    }
                }
        }); 
    }
    
    onSearchAutoComplete(event: any) {
        this.autocompleteQuery = event.query;
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantMemberCreateAction(event.query));          
    }
    onSubmitForm() {
        
    }

    private initAutoComplete(data: any) {
        this.autocompleteOption.results = [];     
        data.forEach((element: any) => {
            this.autocompleteOption.results.push({
                value: element,
                isValid: true,
                isActive: true
            } as tenantMemberAutocomplete)
        });
        this.autocompleteOption.results.unshift({
                value: this.autocompleteQuery,
                isValid: true,
                isActive: false
            } as tenantMemberAutocomplete
        );

    }
    private buildForm(): void {
        this.formMember = this.fb.group({
            users: new FormControl(this.autocompleteResult, Validators.required)            
        });
        this.formMember.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
    private onValueChanged(data?: any) {
        if (!this.formMember) { return; }
        const form = this.formMember;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}
