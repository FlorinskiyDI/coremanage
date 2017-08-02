// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* module */ import { UserAddDialogModule } from '../user-add-dialog/user-add-dialog.module';
/* route */ import { UserRoutes } from './user-routes.module';
/* component */ import { UserComponent } from './user.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutes,
        UserAddDialogModule
    ],

    declarations: [
        UserComponent
    ],

})

export class UserModule { }