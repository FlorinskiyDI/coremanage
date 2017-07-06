import { combineReducers } from 'redux';

/* reducer */ import { TenantMemberGridReducer, TenantMemberGridState } from './tenant-member-grid.reducer';
/* reducer */ import { TenantMemberCreateReducer, TenantMemberCreateState } from './tenant-member-create.reducer';
/* reducer */ import { TenantMemberDeleteReducer, TenantMemberDeleteState } from './tenant-member-delete.reducer';

export interface TenantMemberState {
  memberGrid?: TenantMemberGridState,
  memberCreate?: TenantMemberCreateState,  
  memberDelete?: TenantMemberDeleteState
};

// reducer
export const TenantMemberReducer = combineReducers<TenantMemberState>({
  memberGrid: TenantMemberGridReducer,
  memberCreate: TenantMemberCreateReducer,
  memberDelete: TenantMemberDeleteReducer
});
