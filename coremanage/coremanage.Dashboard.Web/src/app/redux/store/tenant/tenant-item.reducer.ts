import { combineReducers } from 'redux';

/* reducer */ import { TenantItemCreateReducer, TenantItemCreateState } from './tenant-item-create.reducer';
/* reducer */ import { TenantItemUpdateReducer, TenantItemUpdateState } from './tenant-item-update.reducer';
/* reducer */ import { TenantItemDeleteReducer, TenantItemDeleteState } from './tenant-item-delete.reducer';


export interface TenantItemState {
  itemCreate?: TenantItemCreateState,
  itemUpdate?: TenantItemUpdateState,
  itemDelete?: TenantItemDeleteState
};

// reducer
export const TenantItemReducer = combineReducers<TenantItemState>({
  itemCreate: TenantItemCreateReducer,
  itemUpdate: TenantItemUpdateReducer,
  itemDelete: TenantItemDeleteReducer
});
