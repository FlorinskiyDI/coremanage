import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';

import { TenantEpics } from './tenant/tenant.epics';
import { AccountEpics } from './account/account.epics';
import { UserEpics } from './user/user.epics';

@Injectable()
export class RootEpics {
  constructor(
    private tenantEpics: TenantEpics,
    private accountEpics: AccountEpics,
    private userEpics: UserEpics
  ) {}

  public createEpics() {
    return [
      this.tenantEpics.createEpic(),
      this.accountEpics.createEpic(),
      this.userEpics.createEpic()
    ];
  }
}