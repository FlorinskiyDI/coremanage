import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';

export interface TenantTreeSelectState {
  tree: any[];
  treeNode: any;
  selectTenant: any;
  error: any; // property of request 
  loading: boolean; // property of request 
};

const initialState: TenantTreeSelectState = {
  tree: null,
  treeNode: null,
  selectTenant: null,
  error: null,
  loading: false
};


export function TenantTreeSelectReducer(
  state: TenantTreeSelectState = initialState,
  action: IPayloadAction<any>
): TenantTreeSelectState {
  switch (action.type) {

    case TenantActionTypes.LOAD_TENANT_TREE_NODE:
        return Object.assign({}, state, {
          treeNode: null,
          error: null,
          loading: true
        });

    case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:   
        return Object.assign({}, state, {
          treeNode: action.payload,
          error: null,
          loading: false
        });


    case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
        const error = action.payload['error'];
        return Object.assign({}, state, {
          treeNode: null,
          error: error,
          loading: false
        });

    case TenantActionTypes.SET_TENANT_TREE:
        return Object.assign({}, state, {
          tree: action.payload
        }); 

    default:
        return state;

  }
}
