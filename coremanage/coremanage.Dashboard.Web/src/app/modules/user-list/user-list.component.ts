import { Component, OnInit } from '@angular/core';
import { UserProfileApiService } from '../../common/services/api/entities/user-profile.api.service';

@Component({
    selector: 'user-list-component',
    templateUrl: 'user-list.component.html'
})

export class UserLisComponent implements OnInit {

    userList: any;

    constructor(
        private userProfileApiService: UserProfileApiService
    ) { }

    ngOnInit() {
        this.userProfileApiService.getAll()
            .subscribe(
                data => {
                    // this.loginSuccess(data);
                    console.log(data)
                },
                error => {
                    // this.loginError(error);
                    console.log(error)
                }
            );

        this.userList = [
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
            { id: 1, firstName: 'first_1', lastName: 'last_1'},
            { id: 2, firstName: 'first_2', lastName: 'last_2'},
            { id: 3, firstName: 'first_3', lastName: 'last_3'},
        ]
    }
}
