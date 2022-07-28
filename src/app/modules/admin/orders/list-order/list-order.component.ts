import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  dataSource: MatTableDataSource<OrderModel>
  displayedColumns: string[] = ["orderNumber", "amount","order_status", "options"];
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.initTable()
  }

   /**
   * Initial table
   */
    initTable() {
      this.orderService.orders$.subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      })
    }

}
