import {Component, NgModule, Input, ViewChild, ChangeDetectorRef} from '@angular/core'
import { Router } from '@angular/router';

@Component({
    selector: 'template-modal-component',
    templateUrl: 'template-modal.component.html',
    styleUrls: ['./template-modal.component.scss'],
})

export class TemplateModalComponent {
    @Input() items: any[];
    @Input() columns: any;
    
    ngOnChanges() {
        // console.log(this.items);
        console.log(this.columns);
    }

    display: boolean = false;

    showDialog() {
        this.display = true;
    }
}
