import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormZoomVbComponent } from '../form-zoom-vb/form-zoom-vb.component';
import { ZoomVbService } from '../zoom-vb.service';

@Component({
  selector: 'app-list-zoom-vb',
  templateUrl: './list-zoom-vb.component.html',
  styleUrls: ['./list-zoom-vb.component.scss']
})
export class ListZoomVbComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;


  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["path","name", "description", "options"];

  constructor(private dialog: MatDialog, private _zoomVbService: ZoomVbService) { }

  ngOnInit(): void {

    this._zoomVbService.zoomVbs$.subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormZoomVbComponent, {
      data: {
        title: 'Add ZoomVb',
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
    this.dialog.open(FormZoomVbComponent, {
      data: {
        title: 'Edit ZoomVb',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }
}
