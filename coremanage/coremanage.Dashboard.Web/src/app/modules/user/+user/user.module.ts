// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app > routes
import { UserRoutes } from './user-routes.module';
// app > components
import { UserComponent } from './user.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutes
    ],

    declarations: [
        UserComponent
    ],

})

export class UserModule { }