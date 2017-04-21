import * as session from './session';
import * as tenant from './tenant';
import * as user from './user';

export interface IAppState {
  session?: session.ISession;
  tenant?: tenant.ITenant;
  user?: user.IUser;
};