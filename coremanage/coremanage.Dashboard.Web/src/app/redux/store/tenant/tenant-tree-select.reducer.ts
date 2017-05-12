import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';
import { INITIAL_STATE } from './tenant-tree-select.initial-state';
import { List, Map, Record, fromJS} from 'immutable';

export function TenantTreeSelectReducer(
  state = INITIAL_STATE,
  action: IPayloadAction<TenantTreeSelectState>
): any {
  switch (action.type) {

    case TenantActionTypes.LOAD_TENANT_TREE_NODE:
     return state.merge({
        loadedNodes: {
          treeNodes: null,
          error: null,
          loading: true
        }
      });

    case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:
      return state.merge({
        loadedNodes: {
          treeNodes: action.payload,
          error: null,
          loading: false
        }
      });

    case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
      const error = action.payload.loadedNodes.error;
      return state.merge({
        loadedNodes: {
          treeNodes: null,
          error: error,
          loading: false
        }
      });

    case TenantActionTypes.SET_TENANT_TREE:
      return state.merge({
        tree: action.payload
      });

    case TenantActionTypes.SELECT_TENANT_TREE_NODE:
      return state.merge({
        selectedNodeId: Map(action.payload)
      });

    default:
        return state;

  }
}