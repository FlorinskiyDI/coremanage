import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { IUserDto } from '../../redux/store/user';

@Injectable()
export class UserActions {
  // action with
  static ADD_USER: string = "ADD_USER";
  static OPEN_MODAL_EDIT: string = "OPEN_MODAL_EDIT";

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}
    
  public openModalEdit(data: boolean){
    this.ngRedux.dispatch({
      type: UserActions.OPEN_MODAL_EDIT,
      payload: data
    });
  }
}