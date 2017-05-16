import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* service */ import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
/* model */ import { TenantCreateModel } from '../../../../common/index.models';
/* action */ import { TenantActions } from "../../../../redux/actions";
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-add-component',
    templateUrl: 'tenant-add.component.html'
})
export class TenantAddComponent implements OnInit {
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
        private fb: FormBuilder,
    ) {
        this.tenantCreateData = new TenantCreateModel();
        this.tenantList = [];
        // this.pTreeNodes$ = this.ngRedux.select(state => state.tenant.tenantTreeSelect.tree);
        // this.pTreeNodes$.subscribe((value: any) => {
        //     if (value !== undefined) {
        //         this.files = value.toJS();
        //     }
        // });
    }

    ngOnInit() {

        this.tenantActions.loadTenantItemAction();
        this.tenantApiService.getTenantCreate().subscribe(
            data => {
                this.tenantCreateData = Object.assign(this.tenantCreateData, data);
                
                // init options of dropdown
                this.tenantList.push({label: "Without parent tenant", value:{ id: 0, name: "Without tenant" }});
                data.tenantList.forEach((element: any) => {
                    this.tenantList.push({label: element.name, value:{ id: element.id, name: element.name }});
                } );
                this.tenantActions.loadTenantItemSuccessAction(data);
                // this.tenantActions.setTenantTreeAction(<TreeNode[]> data);
                // this.tenantActions.selectTenantTreeNodeAction(data[0]);
            },
            error => { console.log(error); }
        );
        this.buildForm();
    }

    onSubmit() {
        let data = Object.assign({},
            this.tenantCreateData,
            this.tenantCreateForm.value,
            { parentId: this.tenantCreateForm.value.parentId.id }
        ) as TenantCreateModel;
        console.log(data);
        // this.authService.login(loginData)
        //     .subscribe(
        //         () => {
        //             // Get the redirect URL from our auth service. If no redirect has been set, use the default
        //             let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        //             // this.router.navigate([redirect]);
        //             this.router.navigate(['/workspace/tenant-test/dashboard/overview']);
        //         },
        //         error => {
        //             alert('error - Authorization \n message: ' + error);
        //         }
        //     );
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