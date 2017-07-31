import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, ButtonModule, DropdownModule} from 'primeng/primeng';


/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* component */ import { UserAddDialogComponent } from './user-add-dialog.component';
/* component */ import { UserAddComponent } from './comp-user-add/user-add.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DialogModule, ButtonModule, DropdownModule,
    ],
    declarations: [
        UserAddComponent,
        UserAddDialogComponent
    ],
    exports: [
        UserAddDialogComponent
    ]
})

export class UserAddDialogModule {
}