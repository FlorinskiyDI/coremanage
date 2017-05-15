import { Component, Input } from '@angular/core';

@Component({
    selector: 'tenant-add-dialog-component',
    templateUrl: 'tenant-add-dialog.component.html'
})
export class TenantAddDialogComponent {
    // options for the dialog 
    @Input() isOpen: boolean;
}
