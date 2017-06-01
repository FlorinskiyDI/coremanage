import { combineReducers } from 'redux';

/* reducer */ import { TenantItemCreateReducer, TenantItemCreateState } from './tenant-item-create.reducer';
/* reducer */ import { TenantItemUpdateReducer, TenantItemUpdateState } from './tenant-item-update.reducer';


export interface TenantItemState {
  itemCreate?: TenantItemCreateState,
  itemUpdate?: TenantItemUpdateState
};

// reducer
export const TenantItemReducer = combineReducers<TenantItemState>({
  itemCreate: TenantItemCreateReducer,
  itemUpdate: TenantItemUpdateReducer
});
