
export interface IdentityState{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  tenant_list: string[];
  role: string[];
};
export interface ISession {
  token: string;
  refresh_token: string;
  tenant: string;
  user: IdentityState;
  hasError: boolean;
  isLoading: boolean;
};

