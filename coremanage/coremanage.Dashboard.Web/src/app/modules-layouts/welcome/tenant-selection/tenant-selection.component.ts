import { Component, AnimationTransitionEvent } from '@angular/core';
import './tenant-selection.component.scss';
import {RadioButtonModule} from 'primeng/primeng';

@Component({
    selector: 'tenant-selection',
    templateUrl: 'tenant-selection.component.html'
})

export class TenantSelectionComponent {
    selectedValue: string;
}
