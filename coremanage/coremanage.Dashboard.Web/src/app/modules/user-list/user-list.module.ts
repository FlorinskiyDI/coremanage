// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from 'primeng/primeng';

// app > routes
import { UserLisRoutes } from './user-list-routes.module';
// app > components
import { UserLisComponent } from './user-list.component';
// app > services
import { UserProfileApiService } from '../../common/services/api/entities/user-profile.api.service';


@NgModule({
    imports: [
        CommonModule,
        UserLisRoutes,
        DataTableModule
    ],

    declarations: [
        UserLisComponent
    ],
    providers: [
        UserProfileApiService
    ]

})

export class UserListModule { }