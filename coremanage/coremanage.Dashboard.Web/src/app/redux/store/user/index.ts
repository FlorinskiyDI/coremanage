import { combineReducers } from 'redux';

import { UserItemReducer, UserItemState } from './user-item.reducer';


export interface UserState {
  userItem?: UserItemState,
};

// reducer
export const userReducer = combineReducers<UserState>({
  userItem: UserItemReducer,
});
