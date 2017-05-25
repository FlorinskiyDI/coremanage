import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';

import { TenantEpics } from './tenant/tenant.epics';

@Injectable()
export class RootEpics {
  constructor(private tenantEpics: TenantEpics) {}

  public createEpics() {
    return [
      this.tenantEpics.createEpic()
    ];
  }
}