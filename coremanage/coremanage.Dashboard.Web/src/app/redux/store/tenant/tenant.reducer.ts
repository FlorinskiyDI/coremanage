import { Map } from 'immutable';
import { IPayloadAction } from '../../actions';
import { TenantActions } from '../../actions/tenant.actions';
import { ITenant } from './tenant.types';
import { INITIAL_STATE } from './tenant.initial-state';

export function tenantReducer(
  state: ITenant = INITIAL_STATE,
  action: any
): ITenant {
  switch (action.type) {  
  case TenantActions.OPEN_TENANT_DIALOG_ADD:
    return state.merge({         
      isOpenTenantDialogAdd: action.payload      
    });
  default:
    return state;
  }
}
