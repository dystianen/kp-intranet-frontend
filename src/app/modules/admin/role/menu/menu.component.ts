import { Component, Inject, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { MenuService } from '../../menu/menu.service';
import { Menu } from '../../menu/menu.types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../role.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  menusTree$: Observable<Menu[]>

  roleId: number;

  roleHasMenus$: [] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: MenuService, private _roleService: RoleService) {

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    const _this = this;
    this.menusTree$ = this._service.menusTree$;
    this.menusTree$.subscribe(function (data: []) {
      _this.dataSource.data = data;
    })

    if (this.data.roleId) {
      this.roleId = this.data.roleId;
      this._roleService.getMenu(this.data.roleId).subscribe(function (item: any) {
        _this.roleHasMenus$ = item;
      });
    }
  }

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }

  addMenu(menuId: number, add) {
    this._roleService.addMenu(this.roleId, menuId, add == true ? 'add' : 'delete').subscribe(function (data) {

    });
  }

  checkMenu(menuId: number) {
    return this.roleHasMenus$.some((item: any) => menuId == item.menuId);
  }

}
