import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../redux/store';
import { Observable } from 'rxjs/Observable';
import { TenantApiService } from "../../../shared/services/api/entities/tenant.api.service";
import { Router } from '@angular/router';
import { TenantActions } from "../../../redux/actions";

@Component({
    selector: 'tenant-tree-section-component',
    templateUrl: 'tenant-tree-section.component.html',
    styleUrls: ['./tenant-tree-section.component.scss']
})

export class TenantTreeSectionComponent implements OnInit{
    private tenantTree$: Observable<any>;
    private treeNode$: Observable<any>;
    files: TreeNode[];
    dataTest: TreeNode[];

    constructor(
        private tenantApiService: TenantApiService,
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private tenantActions: TenantActions
    ){
        this.tenantTree$ = this.ngRedux.select(state=>state.tenant.tenantTreeSelect.tree);
        this.treeNode$ = this.ngRedux.select(state=>state.tenant.tenantTreeSelect.treeNode);

        this.tenantTree$.subscribe((value: any) => {
            console.log("set tenant tree data");
        });

                
    }

    ngOnInit() {
        let tenantName = this.ngRedux.getState().session.tenant;

        this.tenantActions.loadTenantTreeNodeAction();
        this.tenantApiService.getTenantTreeNode(tenantName)
        .subscribe(
            data => {
                this.tenantActions.loadTenantTreeNodeSuccessAction(data);
                // this.files = <TreeNode[]> data;
                this.tenantActions.setTenantTreeAction(<TreeNode[]> data);
            },
            error => { console.log(error); }
        );        
    }

    loadNode(event: any) {
        if(event.node) {            
            let tenantName = event.node.label;

            this.tenantActions.loadTenantTreeNodeAction();
            this.tenantApiService.getTenantTreeNode(tenantName)           
            .subscribe(
                data => {
                    this.tenantActions.loadTenantTreeNodeSuccessAction(data);                  
                    let ccc = this.getNodeById(event.node.id, this.ngRedux.getState().tenant.tenantTreeSelect.tree);
                    console.log(ccc);
                    if(event.node.children == undefined){
                        event.node.children = <TreeNode[]> data ;
                    }
                },
                error => { console.log(error); }
            );
        }
    }

    goToRoute(tenantName: string){
        this.router.navigate(['/workspace/tenant-test/dashboard/overview']);
    }

    private getNodeById(id: any, node: any){
        var reduce = [].reduce;
        function runner(result: any, node: any): any{
            if(result || !node) return result;
            return node.id === id && node || //is this the proper node?
                runner(null, node.children) || //process this nodes children
                reduce.call(Object(node), runner, result);  //maybe this is some ArrayLike Structure
        }
        return runner(null, node);
    }
}
