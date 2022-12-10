import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormModuleComponent } from '../form-module/form-module.component';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent implements OnInit {

  destinations: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["destination", "cost", "options"];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
