import { combineReducers } from 'redux';

/* reducer */ import { UserItemCreateReducer, UserItemCreateState } from './user-item-create.reducer';
// /* reducer */ import { UserItemUpdateReducer, UserItemUpdateState } from './user-item-update.reducer';
// /* reducer */ import { UserItemDeleteReducer, UserItemDeleteState } from './user-item-delete.reducer';


export interface UserItemState {
  itemCreate?: UserItemCreateState,
  // itemUpdate?: UserItemUpdateState,
  // itemDelete?: UserItemDeleteState
};

// reducer
export const UserItemReducer = combineReducers<UserItemState>({
  itemCreate: UserItemCreateReducer,
  // itemUpdate: UserItemUpdateReducer,
  // itemDelete: UserItemDeleteReducer
});
