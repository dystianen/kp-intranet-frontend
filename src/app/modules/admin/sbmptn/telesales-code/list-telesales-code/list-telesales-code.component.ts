import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormTelesalesCodeComponent } from '../form-telesales-code/form-telesales-code.component';
import { TelesalesCodeService } from '../telesales-code.service';

@Component({
    selector: 'app-list-telesales-code',
    templateUrl: './list-telesales-code.component.html',
    styleUrls: ['./list-telesales-code.component.scss'],
})
export class ListTelesalesCodeComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;

    modules: any[] = [];
    mapel: any = {};
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = [
        'package_category',
        'code',
        'discount_amount',
        'final_price',
        'status',
        'created_at',
        // 'options',
    ];

    constructor(
        private dialog: MatDialog,
        private _teleSalesCodeService: TelesalesCodeService
    ) {}

    ngOnInit(): void {
        this._teleSalesCodeService.telesalescodes$.subscribe((data) => {
            this.modules = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
        });
    }

    /**
     * Show add modal
     */
    add() {
        this.dialog.open(FormTelesalesCodeComponent, {
          data: {
            title: 'Add Telesales Code',
            type: 'add'
          },
          autoFocus: true
        })
    }
}
