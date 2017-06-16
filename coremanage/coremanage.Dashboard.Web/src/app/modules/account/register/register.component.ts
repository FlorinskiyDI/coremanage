import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterData } from '../../../common/index.models';
import { AuthService } from '../../../common/services/auth/auth.service';
import { PasswordMatcherValidator } from '../../../common/index.validators';
@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {



signUpForm: FormGroup;
  user = {
    username: '',
    email: '',
    password: ''
  };
  submitted = false;
  password='';
  confirmedPassword='';

  constructor(      
        private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
    //   'password': new FormControl(null, [Validators.required]),
    //   'confirmedPassword': new FormControl(null, [Validators.required, PasswordMatcherValidator.passwordsMatch(this.password,this.confirmedPassword).bind(this)])
        passwords: this.fb.group({
                    password: ['', [Validators.required]],
                    confirmedPassword: ['', [Validators.required]],
                }, {validator: this.passwordConfirming}),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    }
  }

passwordConfirming(c: AbstractControl): boolean {
      return c.get('password') === c.get('confirmedPassword');
  }



//     registerForm: FormGroup;
//     userForm: FormGroup;
//     registerData: RegisterData;
//     formErrors: any = {
//         'email': '',
//         'name': '',
//         'password': '',
//         'confirmPassword': ''
//     };
//     validationMessages: any = {
//         'email': { 'required': 'Email is required.' },
//         'name': { 'required': 'username is required.' },
//         'password': { 'required': 'Password is required.' },
//         'confirmPassword': { 'required': 'Password is required.' }
//     };

//     constructor(
//         private authService: AuthService,
//         private fb: FormBuilder,
//         private router: Router
//     ) {
//         this.registerData = new RegisterData();
//     }

//     ngOnInit() {
//         this.buildForm();
//         this.buildForm2();
//     }

//     onSubmit() {
//         let registerData = Object.assign({}, this.registerData, this.registerForm.value) as RegisterData;
//         console.log(registerData);
//     }

//     private buildForm(): void {
//         this.registerForm = this.fb.group({
//                 email: new FormControl(this.registerData.email, Validators.required),
//                 name: new FormControl(this.registerData.name, Validators.required),            
//                 password: new FormControl(this.registerData.password, Validators.required),            
//                 confirmPassword: new FormControl(this.registerData.confirmPassword, Validators.required)
//             },  
//             { validator: this.matchingPasswords('password', 'confirmPassword')}
//         );
//         this.registerForm.valueChanges
//             .subscribe(data => this.onValueChanged(data));
//         this.onValueChanged();
//         // this.validatePasswordConfirmation.bind(this)
//     }

//     buildForm2(): void {
//             this.userForm = this.fb.group({
//                 passwords: this.fb.group({
//                     password: ['', [Validators.required]],
//                     confirm_password: ['', [Validators.required]],
//                 }, {validator: this.passwordConfirming}),

//             });
//         }

//     private onValueChanged(data?: any) {
//         if (!this.registerForm) { return; }
//         const form = this.registerForm;
//         for (const field in this.formErrors) {
//             // clear previous error message (if any)
//             this.formErrors[field] = '';
//             const control = form.get(field);
//             if (control && control.dirty && !control.valid) {
//                 const messages = this.validationMessages[field];
//                 for (const key in control.errors) {
//                     this.formErrors[field] += messages[key] + ' ';
//                 }
//             }
//         }
//     }
//     matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
//     return (group: FormGroup ): {
//         [key: string]: any
//     } => {
//         let password = group.controls[passwordKey];
//         let confirmPassword = group.controls[confirmPasswordKey];

//         if (password.value !== confirmPassword.value) {
//             return {
//                 mismatchedPasswords: true
//             };
//         }
//     }
// }

//   passwordConfirming(c: AbstractControl): boolean {
//       return c.get('password') === c.get(' confirm_password');
//   }
}
