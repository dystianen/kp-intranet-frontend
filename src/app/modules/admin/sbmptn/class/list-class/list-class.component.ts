import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from '../class.service';
import { FormClassComponent } from '../form-class/form-class.component';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.scss']
})
export class ListClassComponent implements OnInit {


  classs: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["class_id","description", "options"];

  constructor(private dialog: MatDialog, private _classService: ClassService) { }

  ngOnInit(): void {

    this._classService.class$.subscribe((data) => {
      this.classs = data;
      this.dataSource = new MatTableDataSource(data);
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormClassComponent, {
      data: {
        title: 'Add Class',
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
    this.dialog.open(FormClassComponent, {
      data: {
        title: 'Edit Class',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }
}
