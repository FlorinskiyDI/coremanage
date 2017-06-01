import { combineReducers } from 'redux';

/* reducer */ import { TenantMemberGridReducer, TenantMemberGridState } from './tenant-member-grid.reducer';


export interface TenantMemberState {
  memberGrid?: TenantMemberGridState
};

// reducer
export const TenantMemberReducer = combineReducers<TenantMemberState>({
  memberGrid: TenantMemberGridReducer
});
