import { IPayloadAction } from '../../util';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { UserProfileEntity } from "../../../shared/index.models";

export interface UserListState {
  items: UserProfileEntity[]  
  error: any; // property of request 
  loading: boolean; // property of request 
};

const initialState: UserListState = {
  items: [],   
  error: null,
  loading: false
};


export function userListReducer(
  state: UserListState = initialState,
  action: IPayloadAction<any>
): UserListState {
  switch (action.type) {

    case UserActionTypes.LOAD_USER_LIST:
        return Object.assign({}, state, {      
        items: [],
        error: null,
        loading: true
        });

    case UserActionTypes.LOAD_USER_LIST_SUCCESS:
        const users = action.payload['results'];
        return Object.assign({}, state, {
        items: users,
        error: null,
        loading: false
        });


    case UserActionTypes.LOAD_USER_LIST_FAILURE:
        const error = action.payload['error'];
        return Object.assign({}, state, {
        items: [],
        error: error,
        loading: false
        });  

    default:
        return state;

  }
}
