import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { LoginData } from '../../common/index.models';
import { ISession, IdentityState } from '../../redux/store/session';

@Injectable()
export class SessionActions {
  // action with
  static LOGIN_USER = 'LOGIN_USER';
  static LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
  static LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
  static LOGOUT_USER = 'LOGOUT_USER';

  static SET_TENANT = 'GET_TENANT';
  static SELECT_TENANT = 'SELECT_TENANT';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  public loginUser() {
     this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER,
      payload: {},
    });
  };

  public loginUserSuccess(data: ISession) {
    this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER_SUCCESS,
      payload: data
    });
  }

  public loginUserError() {
    this.ngRedux.dispatch({
      type: SessionActions.LOGIN_USER_ERROR
    });
  };

  public logoutUser() {
    this.ngRedux.dispatch({
      type: SessionActions.LOGOUT_USER
    });
  };

  public setTenant(data: ISession) {
    this.ngRedux.dispatch({
      type: SessionActions.SET_TENANT,
      payload: data
    });
  }
}