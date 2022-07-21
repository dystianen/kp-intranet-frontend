import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DestinationModel } from 'app/model/destination.model';
import { DestinationService } from '../destination.service';
import { FormDestinationComponent } from '../form-destination/form-destination.component';

@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrls: ['./list-destination.component.scss']
})
export class ListDestinationComponent implements OnInit {

  destinations: DestinationModel[] = [];
  dataSource: MatTableDataSource<DestinationModel>
  displayedColumns: string[] = ["destination", "cost", "options"];

  constructor(private destinationService: DestinationService, private dialog: MatDialog) { }

  /**
   * Initial Component
   */
  ngOnInit(): void {
    this.initTable()
  }

  /**
   * Initial table
   */
  initTable() {
    this.destinationService.destinations$.subscribe((data) => {
      this.destinations = data;
      this.dataSource = new MatTableDataSource(data);
    })
  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormDestinationComponent, {
      data: {
        title: 'Add Destination',
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
    this.dialog.open(FormDestinationComponent, {
      data: {
        title: 'Edit Destination',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }

}
