import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(private reportService: ReportsService) { }

  dataSource = new MatTableDataSource<OrderModel>([])

  displayedColumns: string[] = ['orderNumber', 'amount', 'qty_item'];
  ngOnInit(): void {
    this.reportService.sales$.subscribe((res) => {
      this.dataSource.data = res;
    })
  }

}
