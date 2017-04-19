import * as session from './session';
import * as tenant from './tenant';

export interface IAppState {
  session?: session.ISession;
  tenant?: tenant.ITenant;
};