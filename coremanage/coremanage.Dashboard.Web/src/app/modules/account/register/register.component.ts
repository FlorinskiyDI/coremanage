import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

/* model */ import { RegisterData } from '../../../common/index.models';
/* constant */ import { appConstant } from '../../../common/index.constants';
/* action */ import { AccountActions } from "../../../redux/actions";
/* validator */ import { PasswordMatcherValidator } from '../../../common/index.validators';
/* state */ import { IAppState } from '../../../redux/store';

@Component({
    selector: 'register-component',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

signUpForm: FormGroup;

constructor(
  private fb: FormBuilder,  
  private ngRedux: NgRedux<IAppState>,
  private accountActions: AccountActions
) { }

ngOnInit() {
    this.signUpForm = new FormGroup({
    'username': new FormControl(null, [Validators.required, Validators.maxLength(15)]),
    'email': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
    passwords: this.fb.group({        
      password: ['', [, Validators.minLength(6), Validators.required]],
        confirmedPassword: ['', [Validators.required]],
      },
      {
        validator: PasswordMatcherValidator.PasswordsMatch('password', 'confirmedPassword') 
      }
    ),
  });
}

onSubmit() {
    if (this.signUpForm.valid) {

      let signUpForm = this.signUpForm.value;      
      let loginData: RegisterData = {
        redirectUrl: appConstant.confirmEmailUrl,
        email: signUpForm.email,
        username: signUpForm.username,
        password: signUpForm.passwords.password,
        confirmedPassword: signUpForm.passwords.confirmedPassword
      };

      this.ngRedux.dispatch(this.accountActions.postRequestAccountRegistrationAction(loginData));

      console.log(loginData);        
    }
  }
}
