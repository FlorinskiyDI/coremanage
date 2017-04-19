import { ITenant, TenantRecord } from './tenant.types';

export function deimmutifyTenant(tenant: ITenant): Object {
  return tenant.toJS();
}

export function reimmutifyTenant(plain: any): ITenant {
  return new TenantRecord(
    (<any>Object).assign(
      {},
      plain,
      {  }
    )
  ) as ITenant;
}
