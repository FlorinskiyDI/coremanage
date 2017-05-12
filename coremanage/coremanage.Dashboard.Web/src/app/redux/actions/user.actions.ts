import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const UserActionTypes =  {
  /*
    user-list action types
  */
  LOAD_USER_LIST: type('[UserList] load user list'),
  LOAD_USER_LIST_SUCCESS: type('[UserList] successfully loaded user list'),
  LOAD_USER_LIST_FAILURE: type('[UserList] failed to load user list'),

  /*
    user-item action types
  */
  LOAD_USER_ITEM: type('[UserItem] load user item'),
  LOAD_USER_ITEM_SUCCESS: type('[UserItem] successfully loaded user item'),
  LOAD_USER_ITEM_FAILURE: type('[UserItem] failed to load user item'),
}


@Injectable()
export class UserActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  /*
    user-list actions
  */
  public loadUserListAction() {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_LIST
    });
  }
  public loadUserListSuccessAction(data: any) {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_LIST_SUCCESS,
      payload: data
    });
  }
   public loadUserListFailedAction(data: any) {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_LIST_FAILURE,
      payload: data
    });
  }

  /*
    user-list actions
  */
  public loadUserItemAction() {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_ITEM
    });
  }
  public loadUserItemSuccessAction(data: any) {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_ITEM_SUCCESS,
      payload: data
    });
  }
   public loadUserItemFailedAction(data: any) {
    this.ngRedux.dispatch({
      type: UserActionTypes.LOAD_USER_ITEM_FAILURE,
      payload: data
    });
  }
}