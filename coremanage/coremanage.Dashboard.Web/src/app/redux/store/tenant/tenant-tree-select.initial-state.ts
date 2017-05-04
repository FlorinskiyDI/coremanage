
import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';

export const INITIAL_STATE = new TenantTreeSelectRecord(
    (<any>Object).assign(
      {},
      {
  tree: null,
  selectedNode: null,
  loadedNodes: null
},
      {}
    )
  ) as TenantTreeSelectState;
  
  
  
 
