import { Map } from 'immutable';
import { IPayloadAction } from '../../util';
import { SessionActions } from '../../actions/session.actions';
import { ISession, IdentityState } from './session.types';
// import { INITIAL_STATE } from './session.initial-state';


const INITIAL_USER_STATE: IdentityState = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    tenant_list: [],
    role: []
  };

const INITIAL_STATE: ISession = {
  access_token: null,
  refresh_token: null,
  tenant: null,
  user: INITIAL_USER_STATE,
  hasError: false,
  isLoading: false,
};



export function sessionReducer(
  state: ISession = INITIAL_STATE,
  action: IPayloadAction<ISession>
): ISession {
  switch (action.type) {
  case SessionActions.LOGIN_USER:
    return Object.assign({}, state, {
      access_token: null,
      user: {},
      hasError: false,
      isLoading: true
    });

  case SessionActions.LOGIN_USER_SUCCESS:
    const user = action.payload.user;
    return Object.assign({}, state, {
      access_token: action.payload.access_token,
      refresh_token: action.payload.refresh_token,
      tenant: action.payload.tenant,
      user: action.payload.user,
      hasError: false,
      isLoading: false,
    });


  case SessionActions.LOGIN_USER_ERROR:
     return Object.assign({}, state, {
      access_token: null,
      refresh_token: null,
      tenant: null,
      user: {},
      hasError: true,
      isLoading: false,
    });

  case SessionActions.LOGOUT_USER:
    return INITIAL_STATE;

  default:
    return state;
  }
}
