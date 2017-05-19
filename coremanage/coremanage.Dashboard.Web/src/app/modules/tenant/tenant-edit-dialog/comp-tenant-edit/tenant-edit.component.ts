import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* service */ import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantUpdateModel } from '../../../../common/index.models';
/* action */ import { TenantActions } from "../../../../redux/actions";
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
        private fb: FormBuilder,
    ) {
        this.tenantUpdateData = new TenantUpdateModel();
        this.tenantList = [];
        this.tenantItemUpdate$ = this.ngRedux.select(state => state.tenant.tenantItemUpdate);
        this.tenantItemUpdate$.subscribe((value: any) => {                     
            let data = value.toJS();                      
            if (data.item !== null) {   
                this.tenantUpdateData = Object.assign({},
                    this.tenantUpdateData,
                    data.item
                ) as TenantUpdateModel;
                if( data.item.tenantList !== null){
                    //init options of dropdown

                    this.tenantList.push({label: "Without parent tenant", value:{ id: 0, name: "Without tenant" }});
                    data.item.tenantList.forEach((element: any) => {
                        let selectItem = {
                            label: element.name,
                            value:{ id: element.id, name: element.name }
                        }
                        this.tenantList.push(selectItem);
                        if (element.id == data.item.parentId){
                            this.tenantUpdateData.parentId = selectItem.value;
                        }
                    });
                }
                this.buildForm();
            }            
        });
    }

    ngOnInit() {        
        this.buildForm();
    }

    onSubmit() {
        let data = Object.assign({},
            this.tenantUpdateData,
            this.tenantUpdateForm.value,
            { parentId: this.tenantUpdateForm.value.parentId.id }
        ) as TenantUpdateModel;
        this.ngRedux.dispatch(this.tenantActions.postRequestTenantItemUpdateAction(data));
        
        console.log(data);        
    }

    private buildForm(): void {
        this.tenantUpdateForm = this.fb.group({
            name: new FormControl(this.tenantUpdateData.name, Validators.required),
            description: new FormControl(this.tenantUpdateData.description, Validators.required),
            parentId: new FormControl(this.tenantUpdateData.parentId),
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
