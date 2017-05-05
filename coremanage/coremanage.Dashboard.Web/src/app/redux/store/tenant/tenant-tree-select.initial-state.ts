
import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';
import { List } from 'immutable';
export const INITIAL_STATE = new TenantTreeSelectRecord(
    (<any>Object).assign(
      {},
      {
        tree: List([]),
        selectedNode: {},
        loadedNodes: {}
      },
      {}
    )
  ) as TenantTreeSelectState;
  
  
  
 
