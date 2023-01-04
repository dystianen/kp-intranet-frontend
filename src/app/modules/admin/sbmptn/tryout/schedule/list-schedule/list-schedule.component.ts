import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormScheduleComponent } from '../form-schedule/form-schedule.component';
import { ScheduleService } from '../schedule.service';

@Component({
    selector: 'app-list-schedule',
    templateUrl: './list-schedule.component.html',
    styleUrls: ['./list-schedule.component.scss'],
})
export class ListScheduleComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['no','package_name','description','options'];

    schedules: any[] = [];

    constructor(
        private dialog: MatDialog,
        private _scheduleService: ScheduleService
    ) {}

    ngOnInit(): void {
        this._scheduleService.tryoutSchedules$.subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
        });
    }

    add(): void {
        this.dialog.open(FormScheduleComponent, {
            id: 'formSchedule',
            width: '90vw',
            data: {
                title: 'Buat Jadwal Try Out',
                type: 'add',
            },
            disableClose: true,
            autoFocus: true,
        });
    }
}
