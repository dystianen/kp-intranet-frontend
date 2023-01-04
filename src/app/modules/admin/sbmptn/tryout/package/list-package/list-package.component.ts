import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormScheduleComponent } from '../../schedule/form-schedule/form-schedule.component';
import { FormPackageComponent } from '../form-package/form-package.component';
import { PackageService } from '../package.service';

@Component({
    selector: 'app-list-package',
    templateUrl: './list-package.component.html',
    styleUrls: ['./list-package.component.scss'],
})
export class ListPackageComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    modules: any[] = [];
    mapel: any = {};
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['package_name', 'description','tryout_type','tryout_module','tryout_topic','tryout_subtopic', 'options'];

    constructor(
        private dialog: MatDialog,
        private _packageService: PackageService
    ) {}

    ngOnInit(): void {
        this._packageService.tryoutPackages$.subscribe((data: any) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
        });
    }

    add(): void {
        this.dialog.open(FormPackageComponent, {
            id: 'formPackage',
            width: '80vw',
            data: {
                title: 'Buat Paket Soal',
                type: 'add',
            },
            disableClose: true,
            autoFocus: true,
        });
    }

    edit(id) {
        this.dialog.open(FormPackageComponent, {
            width: '80vw',
            data: {
                title: 'Edit Paket Soal',
                type: 'edit',
                id: id,
            },
            autoFocus: true,
        });
    }
}
