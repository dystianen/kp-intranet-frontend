import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormMapelComponent } from '../form-mapel/form-mapel.component';
import { MapelService } from '../mapel.service';

@Component({
  selector: 'app-list-mapel',
  templateUrl: './list-mapel.component.html',
  styleUrls: ['./list-mapel.component.scss']
})
export class ListMapelComponent implements OnInit {

  modules: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["mapel_name", "module","description", "options"];

  constructor(private dialog: MatDialog, private _mapelService: MapelService) { }

  ngOnInit(): void {

    this._mapelService.mapels$.subscribe((data) => {
      this.modules = data;
      this.dataSource = new MatTableDataSource(data);
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
}
