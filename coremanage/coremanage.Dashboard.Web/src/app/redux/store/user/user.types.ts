import { Record, Map } from 'immutable';

// objects
export const UserRecord = Record({
  isOpenModalEdit: false,
});

// immutable
export interface IUser extends Map<string, any>, IUserDto {
  set: (prop: string, val: any) => IUser;
  merge: (other: any) => IUser;
};


// dto interface
export interface IUserDto {
  isOpenModalEdit: boolean;
};

