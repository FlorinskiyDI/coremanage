import { Component, OnInit } from '@angular/core';
import { ValueApiService } from '../../common/services/api/entities/value.api.service';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {NgProgressService} from 'ngx-progressbar';


@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    public valueLoader: any;
    public value = 0;

    constructor(
        public progressService: NgProgressService,
        private slimLoadingBarService: SlimLoadingBarService,
        private valueApiService: ValueApiService,
        private http: Http
    ) {
        this.progressService.set(0);
        this.sampleMethodCall();


        var source = Observable.timer(200, 100)
    .timeInterval()
    .pluck('interval')

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

    }

    startLoading() {
        this.progressService.start()
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }
    public sampleMethodCall() {
    var self  = this;
    var timer = Observable.timer(0,5000);    
    var obj = timer.subscribe(t=>{
        self.getData();
    });       
}

    public getData(){
        console.log("time");
    }

    stopLoading() {
        this.progressService.done()
        this.slimLoadingBarService.stop();
    }

    completeLoading() {
        this.progressService.done()
        this.slimLoadingBarService.complete();
    }
    AddProgress() {
        this.value = this.value + 0.25;
        this.progressService.set(this.value)
        this.slimLoadingBarService.progress = this.slimLoadingBarService.progress + 25;
        console.log(this.slimLoadingBarService.progress);
        
    }
    
    ngOnInit() {
        this.valueLoader = this.slimLoadingBarService.progress;
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
