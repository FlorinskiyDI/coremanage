// external import
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NgRedux, select } from '@angular-redux/store';

// app`s import
import { appConstant } from '../../constants/app.constant';


export abstract  class BaseApiService<TEntity> {
    protected apiServer: string;
    @select(['session', 'token']) token$: Observable<String>;

    constructor(
        private apiRoute: string,
        protected http: Http
    ) {
        this.apiServer = appConstant.apiServer + apiRoute;
        this.token$.subscribe((value: any) => {
            console.log("token - "+ value);
        });
    }

    update(id: number, entity: TEntity): Observable<any> {
        return this.http.put(this.apiServer + id, JSON.stringify(entity))
            .map( (res: Response) => res.json())
            .catch(this.handleError);
    }

    add(entity: TEntity): Observable<TEntity> {
        return this.http.post(this.apiServer, JSON.stringify(entity))
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<TEntity> {
        return this.http.get(this.apiServer + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAll(): Observable<TEntity[]> {
        return this.http.get(this.apiServer)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    delete(id: number): Observable<TEntity> {
        return this.http.delete(this.apiServer + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
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