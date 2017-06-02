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

    constructor(
        // private userProfileApiService: UserProfileApiService
    ) {
        // this.items = this.items.toJS();
    }

    ngOnInit() {       
    }
}
