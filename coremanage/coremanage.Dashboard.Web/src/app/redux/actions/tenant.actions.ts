import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { ITenantDto } from '../../redux/store/tenant';

@Injectable()
export class TenantActions {
  // action with
  static ADD_TENANT: string = "ADD_TENANT";
  static OPEN_TENANT_DIALOG_ADD: string = "OPEN_TENANT_DIALOG_ADD";

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}
  
  

  public addTenant(data: ITenantDto){
    this.ngRedux.dispatch({
      type: TenantActions.ADD_TENANT,
      payload: data
    });
  }

  public openTenantDialogAdd(data: boolean){
    this.ngRedux.dispatch({
      type: TenantActions.OPEN_TENANT_DIALOG_ADD,
      payload: data
    });
  }

}