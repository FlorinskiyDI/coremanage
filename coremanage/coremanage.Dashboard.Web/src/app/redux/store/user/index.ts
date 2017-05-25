import { combineReducers } from 'redux';

import { userListReducer, UserListState } from './user-list.reducer';
import { userItemReducer, UserItemState } from './user-item.reducer';


export interface UserState {
  userList?: UserListState;
  userItem?: UserItemState;
};

export const userReducer = combineReducers<UserState>({
  userList: userListReducer,
  userItem: userItemReducer
});