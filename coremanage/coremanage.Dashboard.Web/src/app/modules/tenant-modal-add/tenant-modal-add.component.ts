import {Component, NgModule, Input, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core'

@Component({
    selector: 'tenant-modal-add-component',
    templateUrl: 'tenant-modal-add.component.html'
})
export class TenantModalAddComponent {
    @ViewChild('model') model:TemplateRef<any>;
    value: any;
    constructor(
        private cdRef:ChangeDetectorRef
    ) { }    
    cars: any[] = [
            { model: "volvo", color: "blue" },
            { model: "saab", color: "yellow" }        
        ];
    myView: any;
    
    
    ngAfterViewInit() {
        this.myView = this.model;        
        this.cdRef.detectChanges();
    }
}
