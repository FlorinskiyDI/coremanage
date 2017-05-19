import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode, MenuItem } from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { fromJS, Map, List, Record } from 'immutable';

/* service */ import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
/* constant */ import { ModalDialogTypes } from '../../../../common/index.constants';
/* action */ import { TenantActions, LayoutActions } from '../../../../redux/actions';
/* state */ import { IAppState } from '../../../../redux/store';

@Component({
    selector: 'tenant-tree-component',
    templateUrl: 'tenant-tree.component.html',
    styleUrls: ['./tenant-tree.component.scss']
})

export class TenantTreeComponent implements OnInit {
    
    private loadedNodes$: Observable<any>
    private selectedNode$: Observable<any>
    private selectedNode: TreeNode;
    private pContexMenuItems: MenuItem[];
    private files: any = [];

    constructor(        
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private tenantApiService: TenantApiService,
        private tenantActions: TenantActions,
        private layoutActions: LayoutActions
    ) {


        this.loadedNodes$ = this.ngRedux.select(state => state.tenant.tenantTree.loadedNodes);
        this.selectedNode$ = this.ngRedux.select(state => state.tenant.tenantTree.selectedNode);
        this.loadedNodes$.subscribe((value: any) => {
            if (value !== undefined) {

                let data = value.toJS();
                if ( data.byNodeName == 0 && data.treeNodes != null){
                    this.selectedNode = data.treeNodes[0];
                    this.files = data.treeNodes;
                    return;
                }

                if (data.treeNodes == null && data.byNodeName != null) {
                    let node = this._getNodeById(data.byNodeName, this.files);
                    if (node != null){
                        node.children = null;
                        node.expanded = false;
                        node.selectable = true;
                    }
                } else {
                    let node = this._getNodeById(data.byNodeName, this.files);
                    if (node != null){
                        node.children = data.treeNodes;
                        node.expanded = true;
                    }
                }

            }
        });

        
    }

    // init component
    ngOnInit() {
          this._initTreeNodes();
          this._initContextMenu();
    }
    private _initTreeNodes() {
        let tenantName = this.ngRedux.getState().session.tenant;
        this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(0));
    }
    private _initContextMenu() {
        this.pContexMenuItems = [
            {
                label: 'Add user'
            },
            {
                label: 'Overview',
                routerLink: ['/pagename']
            }
        ]
    }

    // events of tree
    loadNode(event: any) {
         if (event.node.children == undefined) {
            let tenantId = event.node.id;
            this.ngRedux.dispatch(this.tenantActions.getRequestTenantTreeNodesAction(tenantId));
         }
    }

    selectNode(event: any) {
        let treeNode = event.node;
        this.tenantActions.selectTenantTreeNodeAction(treeNode);
        console.log(treeNode);
    }

    // navigation/routing
    goToRoute(tenantName: string) {
        this.router.navigate(['/workspace/tenant-test/dashboard/overview']);
    }

    // function getting node by nodeId
    private _getNodeById(id: any, node: any) {
        let reduce = [].reduce;
        function runner(result: any, node: any): any {
            if (result || !node) {
                return result
            };
            return node.id === id && node || //is this the proper node?
                runner(null, node.children) || //process this nodes children
                reduce.call(Object(node), runner, result);  //maybe this is some ArrayLike Structure
        }
        return runner(null, node);
    }

    // open dialog for adding new tenant
    showTenantAddDialog() {
        this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modalType: ModalDialogTypes.ADD_TENANT_TYPE,
            extraData: { }
        });
    }
}
