import { Component, OnInit } from '@angular/core';
import { TreeNode, MenuItem } from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';
import { TenantApiService } from "../../../shared/services/api/entities/tenant.api.service";
import { Router } from '@angular/router';
import { TenantActions } from "../../../redux/actions";
import { fromJS, Map, List, Record } from 'immutable';

@Component({
    selector: 'tenant-tree-section-component',
    templateUrl: 'tenant-tree-section.component.html',
    styleUrls: ['./tenant-tree-section.component.scss']
})

export class TenantTreeSectionComponent implements OnInit{
    private pTreeNodes$: Observable<any>
    private pContexMenuItems: MenuItem[];
    private selectedNode: TreeNode;
    private files: any;

    constructor(
        private tenantApiService: TenantApiService,
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private tenantActions: TenantActions
    ){
        this.pTreeNodes$ = this.ngRedux.select(state=>state.tenant.tenantTreeSelect);
        this.pTreeNodes$.subscribe((value: any) => {
            if(value !== undefined)
            {
                let val = value.getIn(['tree']);   
                this.files = value.tree.toJS();          
                console.log("tree value - {1}", value);  
            }         
        }); 
    }

    // init component 
    ngOnInit() {
          this._initTreeNodes();
          this._initContextMenu();
    }    
    private _initTreeNodes(){
        let tenantName = this.ngRedux.getState().session.tenant;
        // this.tenantActions.loadTenantTreeNodeAction();
        this.tenantApiService.getTenantTreeNode(tenantName)
        .subscribe(
            data => {
                // this.tenantActions.loadTenantTreeNodeSuccessAction(data);                
                this.tenantActions.setTenantTreeAction(<TreeNode[]> data);
                // this.tenantActions.selectTenantTreeNodeAction(data[0]);
            },
            error => { console.log(error); }
        );
    }
    private _initContextMenu(){
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
        if(event.node && event.node.children == undefined) {            
            let tenantName = event.node.label;

            // this.tenantActions.loadTenantTreeNodeAction();
            this.tenantApiService.getTenantTreeNode(tenantName)           
            .subscribe(
                data => {
                    // this.tenantActions.loadTenantTreeNodeSuccessAction(data);

                    // set tree with new children nodes
                    let tenantTreeSelect = this.ngRedux.getState().tenant.tenantTreeSelect;
                    let tenantTree = this.ngRedux.getState().tenant.tenantTreeSelect;                    
                    let val = tenantTree.getIn(['tree']).toJS();
                    
                    let node = this._getNodeById(event.node.id, val);
                    node.children = data;
                    node.expanded = true;
                    // let cccRecord = Record(tenantTreeSelect);
                    // let ccc1 = new cccRecord(tenantTreeSelect);
                    // let ccc2 = ccc.toJS();
                    // let node = this._getNodeById(event.node.id, ccc2.tree);
                    // node.children = data;

                    // let treeNodes = List(tree).toJS(); // immutable
                    let ccc = this.files;
                    this.tenantActions.setTenantTreeAction(<TreeNode[]> val);                 
                },
                error => { console.log(error); }
            );
        }
    }
    selectNode(event: any){
        let treeNode = event.node;
        // this.tenantActions.selectTenantTreeNodeAction(treeNode);
        console.log(event);
    }


    // navigation/routing
    goToRoute(tenantName: string){
        this.router.navigate(['/workspace/tenant-test/dashboard/overview']);
    }

    // function getting node by nodeId
    private _getNodeById(id: any, node: any){
        var reduce = [].reduce;
        function runner(result: any, node: any): any{
            if(result || !node) return result;
            // if(node.children !== undefined){
            //     node.children.toJS()
            // }
            return node.id === id && node || //is this the proper node?                
                runner(null, node.children) || //process this nodes children
                reduce.call(Object(node), runner, result);  //maybe this is some ArrayLike Structure
        }
        return runner(null, node);
    }
    
}
