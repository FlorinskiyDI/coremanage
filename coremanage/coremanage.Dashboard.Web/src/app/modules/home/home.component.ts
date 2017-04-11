import { Component, OnInit } from '@angular/core';
import { ValueService } from '../../shared/services/api/entities/value.service';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(
        private valueService: ValueService,
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
        this.valueService.getAll()
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
