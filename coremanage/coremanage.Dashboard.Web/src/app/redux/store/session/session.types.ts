import { Record, Map } from 'immutable';

export const UserRecord = Record({
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  role: []
});

export const SessionRecord = Record({
  token: '',
  user: UserRecord(),
  hasError: false,
  isLoading: false,
});

export interface IUser extends Map<string, any>, IUserDto {
  set: (prop: string, val: any) => IUser;
};

export interface ISession extends Map<string, any>, ISessionDto<IUser> {
  set: (prop: string, val: any) => ISession;
  merge: (other: any) => ISession;
};

export interface IUserDto{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string[];
};

export interface ISessionDto<T> {
  token: string;
  user: T;
  hasError: boolean;
  isLoading: boolean;
};

