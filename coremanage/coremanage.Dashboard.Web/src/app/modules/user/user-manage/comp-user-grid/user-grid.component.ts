import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'user-grid-component',
    templateUrl: 'user-grid.component.html'
})

export class UserGridComponent implements OnInit {
    
    @Input() selectedItem: any;
    @Input() items: any;
    @Input() totalItems:number;
    @Input() pageNumber: number;
    @Input() loading: boolean;
    @Output() onPageChanged = new EventEmitter<any>();
    @Output() onRowDelete = new EventEmitter<any>();

    constructor() { }
    ngOnInit() { }
}
