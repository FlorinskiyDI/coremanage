
import { Map, fromJS } from 'immutable';
import { rootReducer, IAppState } from './root.reducer';

import { TenantEpics } from './tenant/tenant.epics';

export {
  IAppState,
  rootReducer,
};

export const EPICS_PROVIDERS: any[] = [
    TenantEpics
];