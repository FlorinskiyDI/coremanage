import { reimmutifyUser } from './user.transforms';

export const INITIAL_STATE = reimmutifyUser({
  isOpenUserDialogAdd: false,
});
