// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, ButtonModule, DialogModule, AutoCompleteModule, ConfirmDialogModule, GrowlModule} from 'primeng/primeng';

/* module */ import { SharedModule } from '../../../modules-shared/shared.module';
/* module */ import { UserAddDialogModule } from '../user-add-dialog/user-add-dialog.module';
/* routes */ import { UserManageRoutes } from './user-manage-routes.module';
/* component */ import { UserManageComponent } from './user-manage.component';
/* component */ import { UserGridFilterComponent } from './comp-user-grid-filter/user-grid-filter.component';
/* component */ import { UserGridComponent } from './comp-user-grid/user-grid.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        UserManageRoutes,
        UserAddDialogModule,
        ButtonModule, DataTableModule, DialogModule, // primeng
        AutoCompleteModule, ConfirmDialogModule, GrowlModule // primeng
    ],
    declarations: [
        UserManageComponent,
        UserGridComponent,
        UserGridFilterComponent
    ],
})

export class UserManageModule { }