import { Component, NgModule, Input, ViewChild, ChangeDetectorRef} from '@angular/core'
import { Router } from '@angular/router';
import { LayoutActions } from "../../../redux/actions";
import { NgRedux, select } from '@angular-redux/store';
// import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'template-modal-component',
    templateUrl: 'template-modal.component.html',
    styleUrls: ['./template-modal.component.scss'],
})

export class TemplateModalComponent {
    // @Input() items: any[];
    // @Input() columns: any;
    // @Input() name: any;
    // layoutModal$: Observable<any>

    // constructor(
    //     private ngRedux: NgRedux<IAppState>,
    //     private layoutActions: LayoutActions
    // ){
    //     this.layoutModal$ = this.ngRedux.select(state=>state.layout.layoutModal);
    //     this.layoutModal$.subscribe((value: any) => {
    //         let val = value.toJS();
    //         console.log(val);
    //         if(this.name == val.modalType && val.isOpen == true)
    //         {
    //             this.showDialog()
    //         }
    //         else
    //         { 
    //             this.display = false;
    //         }
    //     });   
    // }
    
    // ngOnChanges() {
    //     // console.log(this.items);
    //     console.log(this.columns);
    // }

    // display: boolean = false;
    // fon: boolean = false;

    // showDialog() {
    //     this.display = true;
    // }
    //  hideDialog() {        
    //     this.layoutActions.closeLayoutModalAction();
    // }

}
