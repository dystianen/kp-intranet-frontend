import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormScheduleComponent } from '../../schedule/form-schedule/form-schedule.component';
import { FormPackageComponent } from "../form-package/form-package.component";

@Component({
    selector: 'app-list-package',
    templateUrl: './list-package.component.html',
    styleUrls: ['./list-package.component.scss']
})
export class ListPackageComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    modules: any[] = [];
    mapel: any = {};
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['no', 'id', 'name', 'category', 'module', 'mapel', 'options'];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    add(): void {
        this.dialog.open(FormPackageComponent, {
            id: 'formPackage',
            data: {
                title: 'Buat Paket Soal',
                type: 'addPackage',
            },
            disableClose: true,
            autoFocus: true
        });
    }

}
