import { reimmutifySession } from './session.transforms';

export const INITIAL_STATE = reimmutifySession({
  token: null,
  refresh_token: null,
  tenant: null,
  user: {},
  hasError: false,
  isLoading: false,
});
