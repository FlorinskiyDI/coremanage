import { Record, Map } from 'immutable';

// objects
export const UserRecord = Record({
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  tenant_list: [],
  role: []
});
export const SessionRecord = Record({
  token: '',
  refresh_token: '',
  tenant: '',
  user: UserRecord(),
  hasError: false,
  isLoading: false,
});

// immutable
export interface IUser extends Map<string, any>, IUserDto {
  set: (prop: string, val: any) => IUser;
};
export interface ISession extends Map<string, any>, ISessionDto<IUser> {
  set: (prop: string, val: any) => ISession;
  merge: (other: any) => ISession;
};


// dto interface
export interface IUserDto{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  tenant_list: string[];
  role: string[];
};
export interface ISessionDto<T> {
  token: string;
  refresh_token: string;
  tenant: string;
  user: T;
  hasError: boolean;
  isLoading: boolean;
};

