import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* service */ import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantUpdateModel } from '../../../../common/index.models';
/* action */ import { TenantActions, LayoutActions } from "../../../../redux/actions";
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-edit-component',
    templateUrl: 'tenant-edit.component.html'
})
export class TenantEditComponent implements OnInit {    
    private tenantItemUpdate$: Observable<any>
    tenantUpdateForm: FormGroup;
    tenantUpdateData: TenantUpdateModel;
    tenantList: SelectItem[];
    tenantSelected: string;
    formErrors: any = {
        'name': '',
        'description': '',
        'parentTenantId': ''
    };
    validationMessages: any = {
        'name': { 'required': 'Name is required.' },
        'description': { 'required': 'Description is required.' },
        'parentTenantId': { 'required': 'parentTenantId is required.' }
    };

    

    constructor(
        private tenantApiService: TenantApiService,
        private ngRedux: NgRedux<IAppState>,
        private tenantActions: TenantActions,                
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        // this.tenantUpdateData = new TenantUpdateModel();
        // this.tenantList = [];
        this.tenantItemUpdate$ = this.ngRedux.select(state => state.tenant.tenantItem.itemUpdate);
        this.tenantItemUpdate$.subscribe((value: any) => {                     
            let data = value.toJS();
            this.tenantList = [];
            this.tenantUpdateData = new TenantUpdateModel();
                      
            if (data.getItem !== null) {   
                this.tenantUpdateData = Object.assign({},
                    this.tenantUpdateData,
                    data.getItem.tenant
                ) as TenantUpdateModel;
                if( data.getItem.tenantList !== null){
                    //init options of dropdown
                    this.tenantList.push({label: "Without parent tenant", value:{ id: 0, name: "Without tenant" }});
                    data.getItem.tenantList.forEach((element: any) => {
                        let selectItem = {
                            label: element.name,
                            value:{ id: element.id, name: element.name }
                        }
                        this.tenantList.push(selectItem);
                        if (element.id == data.getItem.tenant.parentTenantId){
                            this.tenantUpdateData.parentTenantId = selectItem.value;
                        }
                    });
                }
                this.buildForm();
            }
            if (data.postItem !== null && data.error === null) {
                this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction())
                this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(null));
                this.tenantUpdateData = new TenantUpdateModel();
            }
        });
    }

    ngOnInit() {
        this.buildForm();
    }

    onSubmit() {
        let parentId = this.tenantUpdateForm.value.parentTenantId ? this.tenantUpdateForm.value.parentTenantId.id : 0;
        let data = {
            tenant: Object.assign({},                
                this.tenantUpdateData,
                this.tenantUpdateForm.value,
                { parentTenantId: parentId }
            ) as TenantUpdateModel
        }
        this.ngRedux.dispatch(this.tenantActions.postRequestTenantItemUpdateAction(data));
        
        console.log(data);        
    }

    private buildForm(): void {
        this.tenantUpdateForm = this.fb.group({
            name: new FormControl(this.tenantUpdateData.name, Validators.required),
            description: new FormControl(this.tenantUpdateData.description, Validators.required),
            parentTenantId: new FormControl(this.tenantUpdateData.parentTenantId),
        });
        this.tenantUpdateForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    private onValueChanged(data?: any) {
        if (!this.tenantUpdateForm) { return; }
        const form = this.tenantUpdateForm;
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
