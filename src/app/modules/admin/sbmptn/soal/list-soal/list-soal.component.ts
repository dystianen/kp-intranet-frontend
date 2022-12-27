import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormSoalComponent } from '../form-soal/form-soal.component';
import { FormUploadComponent } from '../form-upload/form-upload.component';
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
  displayedColumns: string[] = ["no", "id","level", "category", "title", "options"];

  constructor(private dialog: MatDialog, private _soalService: SoalService) { }

  ngOnInit(): void {

    this._soalService.soals$.subscribe((data: any) => {
      // this.modules = data;
      // this.mapel = data.mapel;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }

  /**
   * Show add modal
   */
  add() {
    this._soalService._jawabans.next([]);
    this.dialog.open(FormSoalComponent, {
      id: 'formSoal',
      data: {
        title: 'Buat Soal',
        type: 'addSoal',
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
      id: 'formEditSoal',
      data: {
        title: 'Edit Soal',
        type: 'editSoal',
        id: id,
        mapel: this.mapel
      },
      autoFocus: true
    })
  }

    /**
   * Show upload modal
   */
    onModalUpload() {
        this._soalService._jawabans.next([]);
        this.dialog.open(FormUploadComponent, {
          id: 'formUpload',
          data: {
            title: 'Buat Soal dengan Template',
            type: 'upload',
            mapel: this.mapel
          },
          autoFocus: true
        })
      }
}
