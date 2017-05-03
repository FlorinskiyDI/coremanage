import { reimmutifyTenantTreeSelect } from './tenant-tree-select.transforms';

export const INITIAL_STATE = reimmutifyTenantTreeSelect({
  tree: null,
  selectedNode: null,
  loadedNodes: null
});
