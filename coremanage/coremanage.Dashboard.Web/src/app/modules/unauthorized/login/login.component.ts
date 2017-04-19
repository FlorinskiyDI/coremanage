import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginData } from '../../../shared/index.models';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    loginData: LoginData;
    formErrors: any = {
        'tenant':'',
        'userName': '',
        'password': ''
    };
    validationMessages: any = {
        'tenant': { 'required': 'Tenant is required.' },
        'userName': { 'required': 'Username or Email is required.' },
        'password': { 'required': 'Password is required.' }
    };

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ){
        this.loginData = new LoginData();        
    }

    ngOnInit() {
        this.buildForm();
    }

    onSubmit() {
        let loginData = Object.assign({}, this.loginData, this.loginForm.value) as LoginData;
        let obj2 = this.loginForm.value as LoginData;        
        this.authService.login(loginData)
            .subscribe(
                () => {                    
                    // Get the redirect URL from our auth service. If no redirect has been set, use the default
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';                    
                    // this.router.navigate([redirect]);                    
                    this.router.navigate(['/workspace/tenant-test/dashboard/overview']);
                },
                error => {
                    alert(" error - Authorization \n message: " + error);
                }
            );
    }

    private buildForm(): void {
        this.loginForm = this.fb.group({
            tenant: new FormControl(this.loginData.tenant, Validators.required),
            userName: new FormControl(this.loginData.userName, Validators.required),
            password: new FormControl(this.loginData.password, Validators.required),
            isRemember: new FormControl(this.loginData.isRemember)
        });
        this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    private onValueChanged(data?: any) {
        if (!this.loginForm) { return; }
        const form = this.loginForm;
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
