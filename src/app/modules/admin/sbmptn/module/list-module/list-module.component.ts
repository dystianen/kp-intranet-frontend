import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormModuleComponent } from '../form-module/form-module.component';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent implements OnInit {

  modules: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["code", "name","description","order", "options"];

  constructor(private dialog: MatDialog, private _moduleService: ModuleService) { }

  ngOnInit(): void {

    this._moduleService.modules$.subscribe((data) => {
      this.modules = data;
      this.dataSource = new MatTableDataSource(data);
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormModuleComponent, {
      data: {
        title: 'Add Module',
        type: 'add'
      },
      autoFocus: true
    })
  }

  /**
   * Show edit modal
   * @param id 
   */
  edit(id) {
    this.dialog.open(FormModuleComponent, {
      data: {
        title: 'Edit Module',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }

}
