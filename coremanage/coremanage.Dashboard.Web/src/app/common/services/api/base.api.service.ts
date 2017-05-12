// external import
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Rx';
// app`s import
import { appConstant } from '../../constants/app.constant';
import { CustomRequestOptions } from './custom-request-options.service';

export abstract class BaseApiService<TEntity> {
    protected apiServer: string;

    constructor(
        private apiRoute: string,
        protected http: Http,
        protected customRequestOptions: CustomRequestOptions
    ) {
        this.apiServer = appConstant.apiServer + apiRoute;
    }

    update(
        id: number,
        entity: TEntity,
        optionRequest: RequestOptions = this.customRequestOptions.optionRequestAuth
    ): Observable<any> {
        return this.http.put(this.apiServer + id, JSON.stringify(entity), optionRequest)
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    add(
        entity: TEntity,
        optionRequest: RequestOptions = this.customRequestOptions.optionRequestAuth
    ): Observable<TEntity> {
        return this.http.post(this.apiServer, JSON.stringify(entity), optionRequest)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    get(
        id: number,
        optionRequest: RequestOptions = this.customRequestOptions.optionRequestAuth
    ): Observable<TEntity> {
        return this.http.get(this.apiServer + id, optionRequest)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAll(
        optionRequest: RequestOptions = this.customRequestOptions.optionRequestAuth
    ): Observable<TEntity[]> {
        return this.http.get(this.apiServer, optionRequest)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    delete(
        id: number,
        optionRequest: RequestOptions = this.customRequestOptions.optionRequestAuth
    ): Observable<TEntity> {
        return this.http.delete(this.apiServer + id, optionRequest)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    protected handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }
}