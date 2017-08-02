
import { Map, fromJS } from 'immutable';
import { rootReducer, IAppState } from './root.reducer';

import { TenantEpics } from './tenant/tenant.epics';
import { AccountEpics } from './account/account.epics';
import { UserEpics } from './user/user.epics';

export {
  IAppState,
  rootReducer
};

export const EPICS_PROVIDERS: any[] = [
    TenantEpics,
    AccountEpics,
    UserEpics
];