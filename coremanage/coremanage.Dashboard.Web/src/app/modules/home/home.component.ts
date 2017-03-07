import { Component, OnInit } from '@angular/core';
import { ValueService } from '../../shared/services/api/entities/value.service';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(
        private valueService: ValueService
    ) {
        
    }
    ngOnInit() {
    }
}
