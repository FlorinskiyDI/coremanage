import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record, fromJS} from 'immutable';

// models
export interface LoadedNodesModel {
  byNodeName: string; 
  treeNodes: any[];
  error: any; // property of request
  loading: boolean; // property of request
}
export interface TenantTreeModel {
  tree: any;
  selectedNode: any;
  loadedNodes: LoadedNodesModel;
};

// states
export interface TenantTreeState extends Map<string, any>, TenantTreeModel {
  set: (prop: string, val: any) => TenantTreeState;
  merge: (other: any) => TenantTreeState;
};

// record
export const TenantTreeRecord = Record({
  tree: List([]),
  selectedNode: Map(),
  loadedNodes: Map()
});

// transforms
export function deimmutifyTenantTree(tenantTree: TenantTreeState): Object {
  return tenantTree.toJS();
}

export function reimmutifyTenantTree(plain: any): TenantTreeState {
  return new TenantTreeRecord(
    (<any>Object).assign(
      {},
      plain,
      {}
    )
  ) as TenantTreeState;
}

export const INITIAL_STATE = new TenantTreeRecord(
    (<any>Object).assign(
      {},
      {
        tree: List([]),
        selectedNode: Map(),
        loadedNodes: Map()
      },
      {}
    )
  ) as TenantTreeState;




export function TenantTreeReducer(
  state = INITIAL_STATE,
  action: IPayloadAction<TenantTreeState, any>
): any {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_TREE_NODE:
     return state.merge({
        loadedNodes: {
          byNodeName: action.meta,
          treeNodes: null,
          error: null,
          loading: true
        }
      });

    case TenantActionTypes.REQUEST_TENANT_TREE_NODE_SUCCESS:
      return state.merge({
        loadedNodes: {
          byNodeName: action.meta,
          treeNodes: action.payload,
          error: null,
          loading: false
        }
      });

    case TenantActionTypes.REQUEST_TENANT_TREE_NODE_FAILURE:
      const error = action.payload.loadedNodes.error;
      return state.merge({
        loadedNodes: {
          byNodeName: null,
          treeNodes: null,
          error: error,
          loading: false
        }
      });

    // case TenantActionTypes.SET_TENANT_TREE:
    //   return state.merge({
    //     tree: action.payload
    //   });

    case TenantActionTypes.SELECT_TENANT_TREE_NODE:
      return state.merge({
        selectedNode: Map(action.payload)
      });

    default:
        return state;

  }
}