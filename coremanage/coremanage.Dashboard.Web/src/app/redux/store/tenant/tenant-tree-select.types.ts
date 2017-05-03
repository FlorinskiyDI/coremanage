
import { Record, Map } from 'immutable';

// models
export interface LoadedNodesModel{
  treeNodes: any[];
  error: any; // property of request 
  loading: boolean; // property of request 
}
export interface TenantTreeSelectModel {
  tree: any[];  
  selectedNode: any;
  loadedNodes: LoadedNodesModel;
};

// states
export interface TenantTreeSelectState extends Map<string, any>, TenantTreeSelectModel {
  set: (prop: string, val: any) => TenantTreeSelectState;
  merge: (other: any) => TenantTreeSelectState;
};

// record
export const TenantTreeSelectRecord = Record({
  tree: null,
  selectedNode: null,
  loadedNodes: null
});