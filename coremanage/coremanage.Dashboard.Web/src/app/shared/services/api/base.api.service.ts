// external import
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';
// app`s import
import { appConstant } from '../../constants/app.constant';


export abstract  class BaseApiService<TEntity> {
    protected apiServer: string;
    protected optionRequest: RequestOptions;
    protected optionRequestAuth: RequestOptions;
    private accessToken$: Observable<any>;

    constructor(
        private apiRoute: string,
        protected http: Http,
        private ngRedux: NgRedux<IAppState>
    ) {
        this.apiServer = appConstant.apiServer + apiRoute;
        this.setOptionRequest();

        // accessToken observable
        this.accessToken$ = this.ngRedux.select(state=>state.session.token);
        this.accessToken$.subscribe((value: any) => {
            if (value) { this.setOptionRequestAuth(value) }
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