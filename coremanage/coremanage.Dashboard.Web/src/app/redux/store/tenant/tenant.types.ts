import { Record, Map } from 'immutable';

// objects
export const TenantRecord = Record({
  isOpenTenantDialogAdd: false,
});

// immutable

export interface ITenant extends Map<string, any>, ITenantDto {
  set: (prop: string, val: any) => ITenant;
  merge: (other: any) => ITenant;
};


// dto interface
export interface ITenantDto {  
  isOpenTenantDialogAdd: boolean;
};

