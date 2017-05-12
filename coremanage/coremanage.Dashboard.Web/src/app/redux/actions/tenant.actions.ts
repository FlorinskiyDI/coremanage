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
}