import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { Subscription } from "rxjs/Subscription";

/* api-service */ import { UserProfileApiService } from '../../../../common/services/api/entities/user-profile.api.service';
/* model */ import { UserCreateModel } from '../../../../common/index.models';
/* action */ import { UserActions, LayoutActions } from "../../../../redux/actions";
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'user-add-component',
    templateUrl: 'user-add.component.html'
})
export class UserAddComponent implements OnInit {    
    private userItemCreate$: Observable<any>
    private userItemCreate: Subscription;

    userCreateForm: FormGroup;
    userCreateData: UserCreateModel;
    tenantList: SelectItem[];
    formErrors: any = {
        'email': '',
    };
    validationMessages: any = {
        'email': { 'required': 'Email is required.' },        
    };

    constructor(
        private userProfileApiService: UserProfileApiService,
        private ngRedux: NgRedux<IAppState>,
        private userActions: UserActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        this.userCreateData = new UserCreateModel();
        this.tenantList = [];
        this.userItemCreate$ = this.ngRedux.select(state => state.user.userItem.itemCreate);

        this.userItemCreate = this.userItemCreate$
            .map(data => data.toJS())
            .subscribe(
                (value: any) => {
                    this.tenantList = [];
                    this.userCreateData = new UserCreateModel();

                    if (value.data == null)
                        return;

                    if (!value.isError && value.data.getItem != null)
                    {
                        this.tenantList.push({label: "Without tenant", value:{ id: 0, name: "Without tenant" }});
                        value.data.getItem.tenantList.forEach((element: any) => {
                            this.tenantList.push({
                                label: element.name,
                                value:{ id: element.id, name: element.name }
                            });
                        });
                    }
                    if (!value.isError && value.data.postItem != null)
                    {
                        this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction());
                        // this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(null));
                        this.userCreateData = new UserCreateModel();
                    }

                    if (value.isError)
                        console.log("Tenant delete is failure")
                    if (value.isLoading)
                        console.log("LOADING");
                });        
    }

    ngOnInit() {
        this.buildForm();
    }

    onSubmit() {
        let tenantId = this.userCreateForm.value.tenantId ? this.userCreateForm.value.tenantId.id : 0;
        let data = Object.assign({},
            this.userCreateData,
            this.userCreateForm.value,
            { tenantId: tenantId }
        ) as UserCreateModel;
        this.ngRedux.dispatch(this.userActions.postRequestUserItemCreateAction(data));
        
        console.log(data);        
    }

    private buildForm(): void {
        this.userCreateForm = this.fb.group({
            email: new FormControl(this.userCreateData.email, Validators.required),
            tenantId: new FormControl(this.userCreateData.tenantId)         
        });
        this.userCreateForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    private onValueChanged(data?: any) {
        if (!this.userCreateForm) { return; }
        const form = this.userCreateForm;
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
