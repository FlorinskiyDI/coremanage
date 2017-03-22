import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  @select(['session', 'token']) token$: Observable<String>;
 
  constructor() {
    super();

    this.token$.subscribe((value: any) => {      
      if(value){
        this.headers.set('Authorization', 'Bearer '+ value);
      }
      console.log("DefaultRequestOptions token - "+ value);
    });

    // Set the default 'Content-Type' header    
    this.headers.set('Content-Type', 'application/json');
  }
}

export const requestOptionsProvider = {
    provide: RequestOptions,
    useClass: DefaultRequestOptions
};