import { combineReducers } from 'redux';

import { TenantTreeSelectReducer, TenantTreeSelectState } from './tenant-tree-select.reducer';


export interface TenantState {
  tenantTreeSelect?: TenantTreeSelectState;
};

export const tenantReducer = combineReducers({
  tenantTreeSelect: TenantTreeSelectReducer
});