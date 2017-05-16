import { combineReducers } from 'redux';

import { TenantTreeSelectReducer } from './tenant-tree-select.reducer';
import { TenantTreeSelectState } from './tenant-tree-select.types';
import { TenantItemReducer, TenantItemState } from './tenant-item.reducer';


export interface TenantState {
  tenantTreeSelect?: TenantTreeSelectState;
  tenantItem?: TenantItemState
};

export const tenantReducer = combineReducers<TenantState>({
  tenantTreeSelect: TenantTreeSelectReducer,
  tenantItem: TenantItemReducer
});
export {TenantTreeSelectReducer};