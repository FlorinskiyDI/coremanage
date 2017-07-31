import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

/* api-service */ import { UserApiService } from '../../../../common/services/api/entities/user.api.service';
/* model */ import { UserCreateModel } from '../../../../common/index.models';
/* action */ import { UserActions, LayoutActions } from "../../../../redux/actions";
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'user-add-component',
    templateUrl: 'user-add.component.html'
})
export class UserAddComponent implements OnInit {    
    private userItemCreate$: Observable<any>
    userCreateForm: FormGroup;
    userCreateData: UserCreateModel;
    userList: SelectItem[];
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
        private userApiService: UserApiService,
        private ngRedux: NgRedux<IAppState>,
        private userActions: UserActions,        
        private layoutActions: LayoutActions,
        private fb: FormBuilder,
    ) {
        // this.userCreateData = new UserCreateModel();
        // this.userList = [];
        this.userItemCreate$ = this.ngRedux.select(state => state.user.userItem.itemCreate);
        // this.userItemCreate$.subscribe((value: any) => {
        //     let data = value.toJS();
        //     this.userList = [];
        //     this.userCreateData = new UserCreateModel();

        //     if (data.getItem !== null) {
        //         if( data.getItem.userList !== null){
        //             //init options of dropdown
        //             this.userList.push({label: "Without parent user", value:{ id: 0, name: "Without user" }});
        //             data.getItem.userList.forEach((element: any) => {
        //                 this.userList.push({label: element.name, value:{ id: element.id, name: element.name }});
        //             });
        //         }
        //         this.buildForm();
        //     }
        //     if (data.postItem !== null && data.error === null) {
        //         this.ngRedux.dispatch(this.layoutActions.closeLayoutModalAction());
        //         this.ngRedux.dispatch(this.userActions.getRequestUserTreeNodesAction(null));
        //         this.userCreateData = new UserCreateModel();
        //     }

            
        // });
    }

    ngOnInit() {        
        this.buildForm();
    }

    onSubmit() {
        let parentId = this.userCreateForm.value.parentId ? this.userCreateForm.value.parentId.id : 0;
        let data = Object.assign({},
            this.userCreateData,
            this.userCreateForm.value,
            { parentId: parentId }
        ) as UserCreateModel;
        this.ngRedux.dispatch(this.userActions.postRequestUserItemCreateAction(data));
        
        console.log(data);        
    }

    private buildForm(): void {
        this.userCreateForm = this.fb.group({
            name: new FormControl(this.userCreateData.name, Validators.required),
            description: new FormControl(this.userCreateData.description, Validators.required),
            parentId: new FormControl(this.userCreateData.parentId),
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
