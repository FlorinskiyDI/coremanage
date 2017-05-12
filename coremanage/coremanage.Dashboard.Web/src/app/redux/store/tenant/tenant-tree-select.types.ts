
import { Record, Map, List} from 'immutable';

// models
export interface LoadedNodesModel {
  treeNodes: any[];
  error: any; // property of request
  loading: boolean; // property of request
}
export interface TenantTreeSelectModel {
  tree: any;
  selectedNodeId: number;
  loadedNodes: LoadedNodesModel;
};

// states
export interface TenantTreeSelectState extends Map<string, any>, TenantTreeSelectModel {
  set: (prop: string, val: any) => TenantTreeSelectState;
  merge: (other: any) => TenantTreeSelectState;
};

// record
export const TenantTreeSelectRecord = Record({
  tree: List([]),
  selectedNodeId: null,
  loadedNodes: {}
});