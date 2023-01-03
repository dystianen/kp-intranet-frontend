import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormScheduleComponent } from '../form-schedule/form-schedule.component';

@Component({
    selector: 'app-list-schedule',
    templateUrl: './list-schedule.component.html',
    styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['no', 'id', 'paket', 'tanggal', 'options'];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    add(): void {
        this.dialog.open(FormScheduleComponent, {
            id: 'formSchedule',
            data: {
                title: 'Buat Jadwal',
                type: 'addSchedule',
            },
            disableClose: true,
            autoFocus: true
        });
    }
}
