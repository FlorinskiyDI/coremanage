import {Component, NgModule, Input, ViewChild, ChangeDetectorRef, TemplateRef } from '@angular/core'

@Component({
    selector: 'tenant-modal-add-component',
    templateUrl: 'tenant-modal-add.component.html'
})
export class TenantModalAddComponent {
    @ViewChild('model') model:TemplateRef<any>;
    @ViewChild('model2') model2:TemplateRef<any>;
    value: any;
    nameOfModal: string = "firstmodal"
    nameOfModal2: string = "firstmodal2"
    constructor(
        private cdRef:ChangeDetectorRef
    ) { }    
    cars: any[] = [
            { model: "volvo", color: "blue" },
            { model: "saab", color: "yellow" }        
        ];
    cars2: any[] = [
            { model: "volvo", color: "blue" },
            { model: "saab", color: "yellow" }        
        ];
    myView: any;
    myView2: any;
    
    
    ngAfterViewInit() {
        this.myView = this.model;
        this.myView2 = this.model2;      
        this.cdRef.detectChanges();
    }
}
