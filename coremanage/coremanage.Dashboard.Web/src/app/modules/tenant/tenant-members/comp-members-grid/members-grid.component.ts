import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
    selector: 'members-grid-component',
    templateUrl: 'members-grid.component.html'
})
export class MembersGridComponent {

    @Input() items: any;
    @Input() totalItems:number;
    @Input() pageNumber: number;
    @Input() loading: boolean;
    @Output() onPageChanged = new EventEmitter<number>();


    memberList: any;

    constructor(
        // private userProfileApiService: UserProfileApiService
    ) { }



    ngOnInit() {
        this.memberList = [
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
        ]
    }
}
