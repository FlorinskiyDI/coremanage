import { Component, OnInit } from '@angular/core';
import { ValueApiService } from '../../common/services/api/entities/value.api.service';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(
        private valueApiService: ValueApiService,
        private http: Http
    ) {
        
    }
    ngOnInit() {

        this.http.get("http://localhost:5200/api/Values/")
            .do((res: Response) =>{
                let cc = res.json()
                console.log(cc);
            })
            

        let vvv = "v";
        this.valueApiService.getAll()
            .do(
                data => {
                    console.log(data)
                },
                error => {
                     console.log(error)
                });
        let ddd = "cc";
    }
}
