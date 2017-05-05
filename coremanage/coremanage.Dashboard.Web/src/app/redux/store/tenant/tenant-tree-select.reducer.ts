import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';
import { INITIAL_STATE } from './tenant-tree-select.initial-state';
import { List, Map, Record, fromJS} from 'immutable';

export function TenantTreeSelectReducer(
  state = INITIAL_STATE,
  action: IPayloadAction<TenantTreeSelectState>
): any {
  let state2 = INITIAL_STATE;
  
  switch (action.type) {

    case TenantActionTypes.LOAD_TENANT_TREE_NODE:
     return state.mergeDeep({
        loadedNodes: {
          treeNodes: null,
          error: null,
          loading: true
        }
      });
      

    case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:   
      return state.mergeDeep({
        loadedNodes: {
          treeNodes: action.payload,
          error: null,
          loading: false
        }        
      });
     


    case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
      const error = action.payload.loadedNodes.error;
      return state.mergeDeep({
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
      // let ccc = state.setIn(['tree'],action.payload);
      // return ccc;

    case TenantActionTypes.SELECT_TENANT_TREE_NODE:
      return state.mergeDeep({
        selectedNode: action.payload
      });

    default:
        return state;

  }
}

// --------------------------------------------------------------------------------------------------------------------------------


// const TenantRecord = Record({
//     tree: [],
//     selectedNode: null,
//     loadedNodes: null
// });

// export interface LoadedNodes{
//   treeNodes: any[];
//   error: any; // property of request 
//   loading: boolean; // property of request 
// }
// export class  TenantTreeSelectState  extends TenantRecord {
//   tree: any[];  
//   selectedNode: any;
//   loadedNodes: LoadedNodes;

//   constructor(props: any) {
//         super(props);
//     }
// };


// const initialState = new TenantTreeSelectState({
//   tree: [],
//   selectedNode: null,
//   loadedNodes: null
// });


// export function TenantTreeSelectReducer(
//   state: TenantTreeSelectState = initialState,
//   action: IPayloadAction<any>
// ): TenantTreeSelectState {
//   switch (action.type) {

//     // case TenantActionTypes.LOAD_TENANT_TREE_NODE:
//     //   return Object.assign({}, state, {
//     //     loadedNodes: {
//     //       treeNodes: null,
//     //       error: null,
//     //       loading: true
//     //     }
//     //   });

//     // case TenantActionTypes.LOAD_TENANT_TREE_NODE_SUCCESS:   
//     //   return Object.assign({}, state, {
//     //     loadedNodes: {
//     //       treeNodes: action.payload,
//     //       error: null,
//     //       loading: false
//     //     }        
//     //   });


//     // case TenantActionTypes.LOAD_TENANT_TREE_NODE_FAILURE:
//     //   const error = action.payload['error'];
//     //   return Object.assign({}, state, {
//     //     loadedNodes: {
//     //       treeNodes: null,
//     //       error: error,
//     //       loading: false
//     //     }        
//     //   });

//     case TenantActionTypes.SET_TENANT_TREE:
//       let val1 = new TenantTreeSelectState(state);
//       let val2 = val1.setIn(['tree'], List(action.payload));
//       return val2.toJS() as TenantTreeSelectState;
//       // let rez = Object.assign({}, state, {
//       //   tree: action.payload
//       // });


//     //  let valRecord = Record(state);
//     //  let val1 = new valRecord({tree: List(action.payload)});
//     //   // let val2 = val1.set('tree', List(action.payload));
//     //   return val1.toJS() as TenantTreeSelectState;

//     case TenantActionTypes.SELECT_TENANT_TREE_NODE:
//       return Object.assign({}, state, {
//         selectedNode: action.payload
//       }); 

//     default:
//         return state;

//   }
// }
