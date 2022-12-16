import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormScheduleComponent } from '../form-schedule/form-schedule.component';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {

  schedules: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["module","mapel","hari","time_start","time_end", "options"];

  constructor(private dialog: MatDialog, private _scheduleService: ScheduleService) { }

  ngOnInit(): void {

    this._scheduleService.schedule$.subscribe((data) => {
      this.schedules = data;
      this.dataSource = new MatTableDataSource(data);
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormScheduleComponent, {
      data: {
        title: 'Add Schedule',
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
    this.dialog.open(FormScheduleComponent, {
      data: {
        title: 'Edit Schedule',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }

}
