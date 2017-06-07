import { combineReducers } from 'redux';

/* reducer */ import { TenantMemberGridReducer, TenantMemberGridState } from './tenant-member-grid.reducer';
/* reducer */ import { TenantMemberCreateReducer, TenantMemberCreateState } from './tenant-member-create.reducer';

export interface TenantMemberState {
  memberGrid?: TenantMemberGridState,
  memberCreate?: TenantMemberCreateState
};

// reducer
export const TenantMemberReducer = combineReducers<TenantMemberState>({
  memberGrid: TenantMemberGridReducer,
  memberCreate: TenantMemberCreateReducer
});
