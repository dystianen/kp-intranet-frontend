import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormSoalComponent } from '../form-soal/form-soal.component';
import { SoalService } from '../soal.service';

@Component({
  selector: 'app-list-soal',
  templateUrl: './list-soal.component.html',
  styleUrls: ['./list-soal.component.scss']
})
export class ListSoalComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  modules: any[] = [];
  mapel: any = {}
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["no","title", "options"];

  constructor(private dialog: MatDialog, private _soalService: SoalService) { }

  ngOnInit(): void {

    this._soalService.soals$.subscribe((data: any) => {
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
    this.dialog.open(FormSoalComponent, {
      data: {
        title: 'Add Soal',
        type: 'add',
        mapel: this.mapel
      },
      autoFocus: true
    })
  }

  /**
   * Show edit modal
   * @param id 
   */
  edit(id) {
    this.dialog.open(FormSoalComponent, {
      data: {
        title: 'Edit Soal',
        type: 'edit',
        id: id,
        mapel: this.mapel
      },
      autoFocus: true
    })
  }
}
