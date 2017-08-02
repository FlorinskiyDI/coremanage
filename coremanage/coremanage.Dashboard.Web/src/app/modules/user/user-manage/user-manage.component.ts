import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { ConfirmationService, Message, Confirmation} from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/* state */ import { IAppState } from '../../../redux/store';
/* action */ import { UserActions, LayoutActions } from "../../../redux/actions";
/* model */ import { PageData } from "../../../common/index.models";
/* constant */ import { ModalDialogTypes } from '../../../common/index.constants';

@Component({
    selector: 'user-manage-component',
    templateUrl: 'user-manage.component.html'
})
export class UserManageComponent {

    // member grid options
    public msgs: Message[] = [];
    public selectedItem: any;
    public users: any;
    public usersTotal: Observable<number>;
    public usersPage: Observable<number>;
    public usersLoading: Observable<boolean>;
    // observables
    private userGrid$ = this.ngRedux.select(state => state.user.userGrid);
    
    constructor(
        private userActions: UserActions,
        private ngRedux: NgRedux<IAppState>,
        private layoutActions: LayoutActions,
        // private confirmationService: ConfirmationService
    ) { }
    
    ngOnInit() {
        this._initSubscribe();
    }

    public onPageChangedUsers(data: any) {
        let pageNumber = (data.first == 0 ? 0: data.first + 1) % data.rows + 1;
        let pageData: PageData = {
            totalItemCount: 0,
            totalPageCount: 0,
            pageNumber: pageNumber,
            pageLength: data.rows,
            // filterData: null,
            // sortData: data.multiSortMeta
        }        
        this.ngRedux.dispatch(this.userActions.getRequestUserGridAction({
            data: pageData
        }));
    }
    public onDeleteUserItem(data: any){
    }

    public showDialogUserAdd() {
        this.ngRedux.dispatch(this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.USER_ITEM_ADD_TYPE,
            extraData: { }
        }));
    }




    private _initSubscribe(){
        this.userGrid$
            .map(data => { return data.toJS()})
            .subscribe(value => {
                
                if(value == null)
                    return;

                if (value.isLoading == true)
                {
                    console.log("LOADING");
                }

                if (!value.isError == false)
                {
                    this.users = value.data.items;
                    this.usersTotal = value.data.totalItemCount;
                    this.usersPage = value.data.pageNumber;
                    this.usersLoading = value.isLoading;
                }

                if (value.isError == true )
                {
                    console.log("FAILURE")
                }
                
            });
    }
}
