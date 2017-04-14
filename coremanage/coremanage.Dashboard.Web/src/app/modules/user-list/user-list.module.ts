// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { UserLisRoutes } from './user-list-routes.module';
// app > components
import { UserLisComponent } from './user-list.component';

@NgModule({
    imports: [
        CommonModule,
        UserLisRoutes
    ],

    declarations: [
        UserLisComponent
    ],

})

export class UserListModule { }