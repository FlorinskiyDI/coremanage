import { reimmutifyTenant } from './tenant.transforms';

export const INITIAL_STATE = reimmutifyTenant({
  isOpenTenantDialogAdd: false,
});
