import { Map } from 'immutable';
import { IPayloadAction } from '../../actions';
import { UserActions } from '../../actions/user.actions';
import { IUser } from './user.types';
import { INITIAL_STATE } from './user.initial-state';

export function userReducer(
  state: IUser = INITIAL_STATE,
  action: any
): IUser {
  switch (action.type) {  
  case UserActions.OPEN_MODAL_EDIT:
    return state.merge({         
      isOpenModalEdit: action.payload      
    });
  default:
    return state;
  }
}
