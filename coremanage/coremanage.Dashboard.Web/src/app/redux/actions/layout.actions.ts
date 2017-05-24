import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { type } from '../util';



export const LayoutActionTypes =  {
  /*
    layout-modal action types
  */
  OPEN_LAYOUT_MODAL: type('[LayoutModal] open layout modal'),
  CLOSE_LAYOUT_MODAL: type('[LayoutModal] close layout modal'),
}

@Injectable()
export class LayoutActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  /*
    layout-modal actions
  */
  public openLayoutModalAction(data: any) {
    return {
      type: LayoutActionTypes.OPEN_LAYOUT_MODAL,
      payload: data
    };
  }
  public closeLayoutModalAction() {
    return {
      type: LayoutActionTypes.CLOSE_LAYOUT_MODAL
    };
  }
}