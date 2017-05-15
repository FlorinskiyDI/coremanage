import { Component, OnInit } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../redux/store';
import { Observable } from 'rxjs/Observable';
import { TenantApiService } from '../../../../common/services/api/entities/tenant.api.service';
import { Router } from '@angular/router';
import { TenantActions, LayoutActions } from '../../../../redux/actions';

import { fromJS, Map, List, Record } from 'immutable';

@Component({
    selector: 'tenant-tree-component',
    templateUrl: 'tenant-tree.component.html',
    styleUrls: ['./tenant-tree.component.scss']
})

export class TenantTreeComponent implements OnInit {
    public isOpenD = false;
    private pTreeNodes$: Observable<any>
    private pSelectedNode$: Observable<any>
    private pContexMenuItems: MenuItem[];
    private selectedNode: TreeNode;
    private files: any;

    constructor(
        private tenantApiService: TenantApiService,
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private tenantActions: TenantActions,
        private layoutActions: LayoutActions
    ) {
        this.pTreeNodes$ = this.ngRedux.select(state => state.tenant.tenantTreeSelect.tree);
        this.pTreeNodes$.subscribe((value: any) => {
            if (value !== undefined) {
                this.files = value.toJS();
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
        this.tenantActions.loadTenantTreeNodeAction();
        this.tenantApiService.getTenantTreeNode(tenantName)
        .subscribe(
            data => {
                this.tenantActions.loadTenantTreeNodeSuccessAction(data);
                this.tenantActions.setTenantTreeAction(<TreeNode[]> data);
                this.tenantActions.selectTenantTreeNodeAction(data[0]);
            },
            error => { console.log(error); }
        );
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
        if (event.node && event.node.children == undefined) {
            let tenantName = event.node.label;

            this.tenantActions.loadTenantTreeNodeAction();
            this.tenantApiService.getTenantTreeNode(tenantName)
            .subscribe(
                data => {
                    let tenantTree = this.ngRedux.getState().tenant.tenantTreeSelect.tree.toJS();
                    // finding a child node in the tree
                    // adding children to node
                    let node = this._getNodeById(event.node.id, tenantTree);
                    node.children = data;
                    node.expanded = true;

                    this.tenantActions.loadTenantTreeNodeSuccessAction(data);
                    this.tenantActions.setTenantTreeAction(<TreeNode[]> tenantTree);
                },
                error => { console.log(error); }
            );
        }
    }
    selectNode(event: any) {
        let treeNode = event.node;
        this.tenantActions.selectTenantTreeNodeAction(treeNode);
        console.log(event);
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
    showDialog() {
        this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modelName: 'firstmodal',
            extraData: {}
        });
    }
    showDialog2() {
        this.layoutActions.openLayoutModalAction({
            isOpen: true,
            modelName: 'firstmodal2',
            extraData: {}
        });
    }
}
