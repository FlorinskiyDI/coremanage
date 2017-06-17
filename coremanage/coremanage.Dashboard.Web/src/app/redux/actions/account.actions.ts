import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const AccountActionTypes =  {

  /* confirm-email action types */
  POST_REQUEST_CONFIRM_EMAIL: type('[ConfirmEmail] post request confirm email'),
  POST_REQUEST_CONFIRM_EMAIL_SUCCESS: type('[ConfirmEmail] successfully post requested confirm email'),
  POST_REQUEST_CONFIRM_EMAIL_FAILURE: type('[ConfirmEmail] failed to request post confirm email'),

  /* account-registration action types */
  POST_REQUEST_ACCOUNT_REGISTRATION: type('[AccountRegistration] post request account registration'),
  POST_REQUEST_ACCOUNT_REGISTRATION_SUCCESS: type('[AccountRegistration] successfully post requested account registration'),
  POST_REQUEST_ACCOUNT_REGISTRATION_FAILURE: type('[AccountRegistration] failed to request post account registration'),  
}


@Injectable()
export class AccountActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  /* confirm-email actions */  
  public postRequestConfirmEmailAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL,
      meta: data
    };
  }
  public postRequestConfirmEmailSuccessAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_SUCCESS,
      payload: data
    };
  }
  public postRequestConfirmEmailFailedAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_FAILURE,
      payload: data
    };
  }

  /* account-registration actions */  
  public postRequestAccountRegistrationAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_ACCOUNT_REGISTRATION,
      meta: data
    };
  }
  public postRequestAccountRegistrationSuccessAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_ACCOUNT_REGISTRATION_SUCCESS,
      payload: data
    };
  }
  public postRequestAccountRegistrationFailedAction(data: any) {
    return {
      type: AccountActionTypes.POST_REQUEST_ACCOUNT_REGISTRATION_FAILURE,
      payload: data
    };
  }
}