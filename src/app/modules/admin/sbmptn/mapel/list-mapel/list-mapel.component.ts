import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormMapelComponent } from '../form-mapel/form-mapel.component';
import { MapelService } from '../mapel.service';
import { MatSort, Sort } from '@angular/material/sort'; 65

@Component({
  selector: 'app-list-mapel',
  templateUrl: './list-mapel.component.html',
  styleUrls: ['./list-mapel.component.scss']
})
export class ListMapelComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  modules: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["mapel_name", "module", "description", "thumbnail","thumbnail_mobile","bab", "options"];

  constructor(private dialog: MatDialog, private _mapelService: MapelService) { }

  ngOnInit(): void {

    this._mapelService.mapels$.subscribe((data) => {
      this.modules = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormMapelComponent, {
      data: {
        title: 'Add Mapel',
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
    this.dialog.open(FormMapelComponent, {
      data: {
        title: 'Edit Mapel',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {

    } else {

    }
  }
}
