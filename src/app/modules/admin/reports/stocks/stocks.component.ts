import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { ReportsService } from '../reports.service';
import { utils, writeFileXLSX } from 'xlsx';
import { map } from 'lodash';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  constructor(private reportService: ReportsService) { }

  dataSource = new MatTableDataSource<OrderModel>([])

  displayedColumns: string[] = ['product', 'input_stock', 'note', 'input_date'];
  ngOnInit(): void {
    this.reportService.stocks$.subscribe((res) => {
      this.dataSource.data = res;
    })
  }

  exportExcel(): void {
    const data = map(this.dataSource.data, (item: any) => {
      return {
        product_name: item.products.name,
        input_stock: item.additional_stock,
        note: item.note,
        input_date: item.createdAt
      }
    });
    const ws = utils.json_to_sheet(data)
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "Input Stock.xlsx")
  }

}
