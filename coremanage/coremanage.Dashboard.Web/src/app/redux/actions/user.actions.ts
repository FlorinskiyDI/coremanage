import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const UserActionTypes =  {

   /* user-item-create action types */
  GET_REQUEST_USER_ITEM_CREATE: type('[UserItemCreate] get request user item'),
  GET_REQUEST_USER_ITEM_CREATE_SUCCESS: type('[UserItemCreate] successfully get requested  user item'),
  GET_REQUEST_USER_ITEM_CREATE_FAILURE: type('[UserItemCreate] failed to request get user item'),
  POST_REQUEST_USER_ITEM_CREATE: type('[UserItemCreate] post request user item'),
  POST_REQUEST_USER_ITEM_CREATE_SUCCESS: type('[UserItemCreate] successfully post requested  user item'),
  POST_REQUEST_USER_ITEM_CREATE_FAILURE: type('[UserItemCreate] failed to request post user item'),
  /* user-item-update action types */
  GET_REQUEST_USER_ITEM_UPDATE: type('[UserItemUpdate] get request user item'),
  GET_REQUEST_USER_ITEM_UPDATE_SUCCESS: type('[UserItemUpdate] successfully get requested  user item'),
  GET_REQUEST_USER_ITEM_UPDATE_FAILURE: type('[UserItemUpdate] failed to request get user item'),
  POST_REQUEST_USER_ITEM_UPDATE: type('[UserItemUpdate] post request user item'),
  POST_REQUEST_USER_ITEM_UPDATE_SUCCESS: type('[UserItemUpdate] successfully post requested  user item'),
  POST_REQUEST_USER_ITEM_UPDATE_FAILURE: type('[UserItemUpdate] failed to request post user item'),
  /* user-item-delete action types */
  DELETE_USER_ITEM: type('[UserDelete] delete user'),
  DELETE_USER_ITEM_SUCCESS: type('[UserDelete] successfully delete user'),
  DELETE_USER_ITEM_FAILURE: type('[UserDelete] failed to delete user'),

  /*
    user-list action types
  */
  LOAD_USER_LIST: type('[UserList] load user list'),
  LOAD_USER_LIST_SUCCESS: type('[UserList] successfully loaded user list'),
  LOAD_USER_LIST_FAILURE: type('[UserList] failed to load user list'),
 
}


@Injectable()
export class UserActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  /* user-item-create actions */
  public getRequestUserItemCreateAction() {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_CREATE
    };
  }
  public getRequestUserItemCreateSuccessAction(data: any) {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_CREATE_SUCCESS,
      payload: data
    };
  }
  public getRequestUserItemCreateFailedAction(data: any) {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_CREATE_FAILURE,
      payload: data
    };
  }
  public postRequestUserItemCreateAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_CREATE,
      meta: data
    };
  }
  public postRequestUserItemCreateSuccessAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_CREATE_SUCCESS,
      payload: data
    };
  }
  public postRequestUserItemCreateFailedAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_CREATE_FAILURE,
      payload: data
    };
  }

  /* user-item-update actions */
  public getRequestUserItemUpdateAction(data: any) {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_UPDATE,
      meta: data
    };
  }
  public getRequestUserItemUpdateSuccessAction(data: any) {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_UPDATE_SUCCESS,
      payload: data
    };
  }
  public getRequestUserItemUpdateFailedAction(data: any) {
    return {
      type: UserActionTypes.GET_REQUEST_USER_ITEM_UPDATE_FAILURE,
      payload: data
    };
  }
  public postRequestUserItemUpdateAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_UPDATE,
      meta: data,
    };
  }
  public postRequestUserItemUpdateSuccessAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_UPDATE_SUCCESS,
      payload: data
    };
  }
  public postRequestUserItemUpdateFailedAction(data: any) {
    return {
      type: UserActionTypes.POST_REQUEST_USER_ITEM_UPDATE_FAILURE,
      payload: data
    };
  }  
  public deleteUserItemAction(data: any) {
    return {
      type: UserActionTypes.DELETE_USER_ITEM,
      meta: data
    };
  }
  public deleteUserItemSuccessAction(data: any) {
    return {
      type: UserActionTypes.DELETE_USER_ITEM_SUCCESS,
      payload: data
    };
  }
  public deleteUserItemFailedAction(data: any) {
    return {
      type: UserActionTypes.DELETE_USER_ITEM_FAILURE,
      payload: data
    };
  }

}