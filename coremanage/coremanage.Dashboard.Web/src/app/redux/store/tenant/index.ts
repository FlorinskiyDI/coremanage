import { combineReducers } from 'redux';

import { TenantTreeSelectReducer } from './tenant-tree-select.reducer';
import { TenantTreeSelectState } from './tenant-tree-select.types';
import { TenantCreateItemReducer, TenantCreateItemState } from './tenant-create-item.reducer';


export interface TenantState {
  tenantTreeSelect?: TenantTreeSelectState;
  tenantCreateItem?: TenantCreateItemState
};

// reducer
export const tenantReducer = combineReducers<TenantState>({
  tenantTreeSelect: TenantTreeSelectReducer,
  tenantCreateItem: TenantCreateItemReducer
});
