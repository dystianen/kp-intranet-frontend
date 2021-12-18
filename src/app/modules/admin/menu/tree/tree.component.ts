import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MenuService } from '../menu.service';
import { Observable } from 'rxjs';
import { Menu } from '../menu.types';
import { toArray } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { MatDialog } from '@angular/material/dialog';


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
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

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

  constructor(private _service: MenuService,public dialog: MatDialog) {

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    const _this = this;
    this.menusTree$ = this._service.menusTree$;
    this.menusTree$.subscribe(function (data: []) {
      _this.dataSource.data = data;
    })

  }

  editDialog(id: number) {
    const _this = this;
    this._service.getMenu(id).subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Menu',
          formType: 'edit'
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    })
  }

  addDialog(id: number) {
    const _this = this;
    this._service.getMenu(id).subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Add New Menu',
          formType: 'add',
          parentId: id
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    })
  }


}
