import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const TenantActionTypes =  {

  /* tenant-tree action types */
  GET_REQUEST_TENANT_TREE_NODE: type('[TenantTree] load tenant tree nodes'),
  REQUEST_TENANT_TREE_NODE_SUCCESS: type('[TenantTree] successfully loaded tenant tree nodes'),
  REQUEST_TENANT_TREE_NODE_FAILURE: type('[TenantTree] failed to load tenant tree nodes'),
  SET_TENANT_TREE: type('[TenantTree] set to the tree value'),
  SELECT_TENANT_TREE_NODE: type('[TenantTree] selected tree nodes'),

  /* tenant-item-create action types */
  GET_REQUEST_TENANT_ITEM_CREATE: type('[TenantItemCreate] get request tenant item'),
  GET_REQUEST_TENANT_ITEM_CREATE_SUCCESS: type('[TenantItemCreate] successfully get requested  tenant item'),
  GET_REQUEST_TENANT_ITEM_CREATE_FAILURE: type('[TenantItemCreate] failed to request get tenant item'),
  POST_REQUEST_TENANT_ITEM_CREATE: type('[TenantItemCreate] post request tenant item'),
  POST_REQUEST_TENANT_ITEM_CREATE_SUCCESS: type('[TenantItemCreate] successfully post requested  tenant item'),
  POST_REQUEST_TENANT_ITEM_CREATE_FAILURE: type('[TenantItemCreate] failed to request post tenant item'),

  /* tenant-item-update action types */
  GET_REQUEST_TENANT_ITEM_UPDATE: type('[TenantItemUpdate] get request tenant item'),
  GET_REQUEST_TENANT_ITEM_UPDATE_SUCCESS: type('[TenantItemUpdate] successfully get requested  tenant item'),
  GET_REQUEST_TENANT_ITEM_UPDATE_FAILURE: type('[TenantItemUpdate] failed to request get tenant item'),
  POST_REQUEST_TENANT_ITEM_UPDATE: type('[TenantItemUpdate] post request tenant item'),
  POST_REQUEST_TENANT_ITEM_UPDATE_SUCCESS: type('[TenantItemUpdate] successfully post requested  tenant item'),
  POST_REQUEST_TENANT_ITEM_UPDATE_FAILURE: type('[TenantItemUpdate] failed to request post tenant item'),

}


@Injectable()
export class TenantActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  /* tenant-tree actions */
  public getRequestTenantTreeNodesAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_TREE_NODE,
      meta: data,
    };
  }
  public requestTenantTreeNodesSuccessAction(data: any, meta: any) {
    return {
      type: TenantActionTypes.REQUEST_TENANT_TREE_NODE_SUCCESS,
      meta: meta,
      payload: data
    };
  }
  public requestTenantTreeNodesFailedAction(data: any) {
    return {
      type: TenantActionTypes.REQUEST_TENANT_TREE_NODE_FAILURE,
      payload: data
    };
  }
  public setTenantTreeAction(data: any) {
    this.ngRedux.dispatch({
      type: TenantActionTypes.SET_TENANT_TREE,
      payload: data
    });
  }
  public selectTenantTreeNodeAction(data: any) {
    this.ngRedux.dispatch({
      type: TenantActionTypes.SELECT_TENANT_TREE_NODE,
      payload: data
    });
  }

  /* tenant-tree-select actions */
  public getRequestTenantItemCreateAction() {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE
    };
  }
   public getRequestTenantItemCreateSuccessAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE_SUCCESS,
      payload: data
    };
  }
  public getRequestTenantItemCreateFailedAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE_FAILURE,
      payload: data
    };
  }
  public postRequestTenantItemCreateAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE,
      meta: data
    };
  }
  public postRequestTenantItemCreateSuccessAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE_SUCCESS,
      payload: data
    };
  }
  public postRequestTenantItemCreateFailedAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE_FAILURE,
      payload: data
    };
  }

  /* tenant-item-update actions */
  public getRequestTenantItemUpdateAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE,
      meta: data
    };
  }
  public getRequestTenantItemUpdateSuccessAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE_SUCCESS,
      payload: data
    };
  }
  public getRequestTenantItemUpdateFailedAction(data: any) {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE_FAILURE,
      payload: data
    };
  }
  public postRequestTenantItemUpdateAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE,
      meta: data,
    };
  }
  public postRequestTenantItemUpdateSuccessAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE_SUCCESS,
      payload: data
    };
  }
  public postRequestTenantItemUpdateFailedAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE_FAILURE,
      payload: data
    };
  }
}