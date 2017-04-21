import { IUser, UserRecord } from './user.types';

export function deimmutifyUser(user: IUser): Object {
  return user.toJS();
}

export function reimmutifyUser(plain: any): IUser {
  return new UserRecord(
    (<any>Object).assign(
      {},
      plain,
      {}
    )
  ) as IUser;
}
