import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const TenantActionTypes =  {
  /*
    tenant-tree-select action types
  */
  LOAD_TENANT_TREE_NODE: type('[TenantTreeSelect] load tenant treeNode'),
  LOAD_TENANT_TREE_NODE_SUCCESS: type('[TenantTreeSelect] successfully loaded tenant treeNode'),
  LOAD_TENANT_TREE_NODE_FAILURE: type('[TenantTreeSelect] failed to load tenant treeNode'),
  SET_TENANT_TREE: type('[TenantTreeSelect] set to the tree value'),
  SELECT_TENANT_TREE_NODE: type('[TenantTreeSelect] selected treeNode'),

   /*
    tenant-tree-select action types
  */
  GET_REQUEST_TENANT_CREATE_ITEM: type('[TenantCreateItem] get request tenant item'),
  POST_REQUEST_TENANT_CREATE_ITEM: type('[TenantCreateItem] post request tenant item'),
  REQUEST_TENANT_CREATE_ITEM_SUCCESS: type('[TenantCreateItem] successfully requested  tenant item'),
  REQUEST_TENANT_CREATE_ITEM_FAILURE: type('[TenantCreateItem] failed to request tenant item'),

}


@Injectable()
export class TenantActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  /*
    tenant-tree-select actions
  */
  public loadTenantTreeNodeAction() {
    this.ngRedux.dispatch({
      type: TenantActionTypes.LOAD_TENANT_TREE_NODE
    });
  }
  public loadTenantTreeNodeSuccessAction(data: any) {
    this.ngRedux.dispatch({
      type: TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS,
      payload: data
    });
  }
  public loadTenantTreeNodeFailedAction(data: any) {
    this.ngRedux.dispatch({
      type: TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE,
      payload: data
    });
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

  /*
    tenant-tree-select actions
  */
  public getRequestTenantCreateItemAction() {
    return {
      type: TenantActionTypes.GET_REQUEST_TENANT_CREATE_ITEM
    };
  }

  public postRequestTenantCreateItemAction(data: any) {
    return {
      type: TenantActionTypes.POST_REQUEST_TENANT_CREATE_ITEM,
      meta: data,
    };
  }

  public requestTenantCreateItemSuccessAction(data: any) {
    return {
      type: TenantActionTypes.REQUEST_TENANT_CREATE_ITEM_SUCCESS,
      payload: data
    };
  }
  public requestTenantCreateItemFailedAction(data: any) {
    return {
      type: TenantActionTypes.REQUEST_TENANT_CREATE_ITEM_FAILURE,
      payload: data
    };
  }
}