import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomRequestOptions{

  public optionRequest: RequestOptions;
  public optionRequestAuth: RequestOptions;
  private accessToken$: Observable<any>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.setOptionRequest();
    this.accessToken$ = this.ngRedux.select(state=>state.session.token);
      this.accessToken$.subscribe((value: any) => {
        if (value) { this.setOptionRequestAuth(value) }
        else { console.warn("access token not found!!!"); }
    });
  }

  private setOptionRequest() {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.optionRequest = new RequestOptions({headers: headers});       
  }

  private setOptionRequestAuth(accessToken: string) {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');        
    headers.append("Authorization", "Bearer " + accessToken);
    this.optionRequestAuth = new RequestOptions({headers: headers});
  }
}