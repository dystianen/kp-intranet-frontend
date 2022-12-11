import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BabService } from '../bab.service';
import { FormBabComponent } from '../form-bab/form-bab.component';

@Component({
  selector: 'app-list-bab',
  templateUrl: './list-bab.component.html',
  styleUrls: ['./list-bab.component.scss']
})
export class ListBabComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  modules: any[] = [];
  mapel: any = {}
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["bab_name", "module", "description","bank_soal", "bab", "options"];

  constructor(private dialog: MatDialog, private _babService: BabService) { }

  ngOnInit(): void {

    this._babService.babs$.subscribe((data:any) => {
      this.modules = data;
      this.mapel = data.mapel;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormBabComponent, {
      data: {
        title: 'Add Bab',
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
    this.dialog.open(FormBabComponent, {
      data: {
        title: 'Edit Bab',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }
}
