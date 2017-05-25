import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* service */ import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantCreateModel } from '../../../../common/index.models';
/* action */ import { TenantActions, LayoutActions } from "../../../../redux/actions";
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-add-component',
    templateUrl: 'tenant-add.component.html'
})
export class TenantAddComponent implements OnInit {    
    private tenantItemCreate$: Observable<any>
    tenantCreateForm: FormGroup;
    tenantCreateData: TenantCreateModel;
    tenantList: SelectItem[];
    formErrors: any = {
        'name': '',
        'description': '',
        'parentId': ''
    };
    validationMessages: any = {
        'name': { 'required': 'Name is required.' },
        'description': { 'required': 'Description is required.' },
        'parentId': { 'required': 'parentId is required.' }
    };

    constructor(
        private tenantApiService: TenantApiService,
        private ngRedux: NgRedux<IAppState>,
        private tenantActions: TenantActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        // this.tenantCreateData = new TenantCreateModel();
        // this.tenantList = [];
        this.tenantItemCreate$ = this.ngRedux.select(state => state.tenant.tenantItemCreate);
        this.tenantItemCreate$.subscribe((value: any) => {
            let data = value.toJS();
            this.tenantList = [];
            this.tenantCreateData = new TenantCreateModel();

            if (data.getItem !== null) {
                if( data.getItem.tenantList !== null){
                    //init options of dropdown
                    this.tenantList.push({label: "Without parent tenant", value:{ id: 0, name: "Without tenant" }});
                    data.getItem.tenantList.forEach((element: any) => {
                        this.tenantList.push({label: element.name, value:{ id: element.id, name: element.name }});
                    });
                }
                this.buildForm();
            }
            if (data.postItem !== null && data.error === null) {
                this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction());
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(null));
                this.tenantCreateData = new TenantCreateModel();
            }

            
        });
    }

    ngOnInit() {        
        this.buildForm();
    }

    onSubmit() {
        let parentId = this.tenantCreateForm.value.parentId ? this.tenantCreateForm.value.parentId.id : 0;
        let data = Object.assign({},
            this.tenantCreateData,
            this.tenantCreateForm.value,
            { parentId: parentId }
        ) as TenantCreateModel;
        this.ngRedux.dispatch(this.tenantActions.postRequestTenantItemCreateAction(data));
        
        console.log(data);        
    }

    private buildForm(): void {
        this.tenantCreateForm = this.fb.group({
            name: new FormControl(this.tenantCreateData.name, Validators.required),
            description: new FormControl(this.tenantCreateData.description, Validators.required),
            parentId: new FormControl(this.tenantCreateData.parentId),
        });
        this.tenantCreateForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    private onValueChanged(data?: any) {
        if (!this.tenantCreateForm) { return; }
        const form = this.tenantCreateForm;
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
