import { combineReducers } from 'redux';

import { UserItemReducer, UserItemState } from './user-item.reducer';
import { UserGridReducer, UserGridState} from './user-grid.reducer';

export interface UserState {
  userItem?: UserItemState,
  userGrid?: UserGridState,
};

// reducer
export const userReducer = combineReducers<UserState>({
  userItem: UserItemReducer,
  userGrid: UserGridReducer
});
