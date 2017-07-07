import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomRequestOptions {

  // public optionRequest: RequestOptions;
  // public optionRequestAuth: RequestOptions;
  private accessToken$: Observable<any>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    // this.setOptionRequest();
    // this.accessToken$ = this.ngRedux.select(state => state.session.access_token);
    // this.accessToken$.subscribe((value: any) => {
    //     if (value) {
    //       this.setOptionRequestAuth(value)
    //     } else {
    //       console.warn('access token not found!!!');
    //     }
    // });
  }

  public getOptionRequest(): RequestOptions {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({headers: headers});
  }

  public getOptionRequestAuth(): RequestOptions {
    let access_token = this.ngRedux.getState().session.access_token;
    if(access_token == null)
      console.warn('access token not found!!!');

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    return new RequestOptions({headers: headers});
  }
}