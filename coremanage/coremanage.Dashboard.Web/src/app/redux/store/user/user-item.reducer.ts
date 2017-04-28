import { IPayloadAction } from '../../util';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { UserProfileEntity } from "../../../shared/index.models";

export interface UserItemState {
  item: UserProfileEntity;
  error: any; // property of request 
  loading: boolean; // property of request 
};

const initialState: UserItemState = {
  item: null,
  error: null,
  loading: false
};


export function userItemReducer(
  state: UserItemState = initialState,
  action: IPayloadAction<any>
): UserItemState {
  switch (action.type) {

    case UserActionTypes.LOAD_USER_ITEM:
        return Object.assign({}, state, {      
        item: null,
        error: null,
        loading: true
        });

    case UserActionTypes.LOAD_USER_ITEM_SUCCESS:
        const user = action.payload['results'];
        return Object.assign({}, state, {
        item: user,
        error: null,
        loading: false
        });


    case UserActionTypes.LOAD_USER_ITEM_FAILURE:
        const error = action.payload['error'];
        return Object.assign({}, state, {
        item: null,
        error: error,
        loading: false
        });  

    default:
        return state;

  }
}
