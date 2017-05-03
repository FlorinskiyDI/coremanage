import { TenantTreeSelectState, TenantTreeSelectRecord } from './tenant-tree-select.types';

export function deimmutifyTenantTreeSelect(tenantTreeSelect: TenantTreeSelectState): Object {
  return tenantTreeSelect.toJS();
}

export function reimmutifyTenantTreeSelect(plain: any): TenantTreeSelectState {
  return new TenantTreeSelectRecord(
    (<any>Object).assign(
      {},
      plain,
      {}
    )
  ) as TenantTreeSelectState;
}
