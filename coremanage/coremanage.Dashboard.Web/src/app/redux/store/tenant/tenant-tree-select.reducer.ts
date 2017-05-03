import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';
import { INITIAL_STATE } from './tenant-tree-select.initial-state';

export function TenantTreeSelectReducer(
  state = INITIAL_STATE,
  action: IPayloadAction<any>
): TenantTreeSelectState {
  let state2 = INITIAL_STATE;
  let val: any;
  switch (action.type) {

    case TenantActionTypes.LOAD_TENANT_TREE_NODE:
      val = state.merge({
        loadedNodes: {
          treeNodes: null,
          error: null,
          loading: true
        }
      });
      return val;

    case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:   
      val =  state.merge({
        loadedNodes: {
          treeNodes: action.payload,
          error: null,
          loading: false
        }        
      });
      return val;


    case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
      const error = action.payload.loadedNodes.error;
      val =  state.merge({
        loadedNodes: {
          treeNodes: null,
          error: error,
          loading: false
        }             
      });
      return val;

    case TenantActionTypes.SET_TENANT_TREE:
      val = state.merge({
        tree: action.payload
      }).toJS() as TenantTreeSelectState;
      return val;

    case TenantActionTypes.SELECT_TENANT_TREE_NODE:
      val =  state.merge({
        selectedNode: action.payload
      });
      return val;

    default:
        return state;

  }
}

// export interface LoadedNodes{
//   treeNodes: any[];
//   error: any; // property of request 
//   loading: boolean; // property of request 
// }
// export interface TenantTreeSelectState {
//   tree: any[];  
//   selectedNode: any;
//   loadedNodes: LoadedNodes;
// };


// const initialState: TenantTreeSelectState = {
//   tree: null,
//   selectedNode: null,
//   loadedNodes: null
// };


// export function TenantTreeSelectReducer(
//   state: TenantTreeSelectState = initialState,
//   action: IPayloadAction<any>
// ): TenantTreeSelectState {
//   switch (action.type) {

//     case TenantActionTypes.LOAD_TENANT_TREE_NODE:
//       return Object.assign({}, state, {
//         loadedNodes: {
//           treeNodes: null,
//           error: null,
//           loading: true
//         }
//       });

//     case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:   
//       return Object.assign({}, state, {
//         loadedNodes: {
//           treeNodes: action.payload,
//           error: null,
//           loading: false
//         }        
//       });


//     case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
//       const error = action.payload['error'];
//       return Object.assign({}, state, {
//         loadedNodes: {
//           treeNodes: null,
//           error: error,
//           loading: false
//         }        
//       });

//     case TenantActionTypes.SET_TENANT_TREE:
//       return Object.assign({}, state, {
//         tree: action.payload
//       });

//     case TenantActionTypes.SELECT_TENANT_TREE_NODE:
//       return Object.assign({}, state, {
//         selectedNode: action.payload
//       }); 

//     default:
//         return state;

//   }
// }
