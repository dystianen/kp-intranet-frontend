import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { Observable } from 'rxjs';
import { DetailOrderComponent } from '../detail-order/detail-order.component';
import { OrderService } from '../order.service';
import { ProcessOrderComponent } from '../process-order/process-order.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  dataSource: MatTableDataSource<OrderModel>
  displayedColumns: string[] = ["orderNumber", "amount", "order_status", "options"];

  status: Observable<string>;

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

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

    this.status = this.orderService.status;
  }

  /**
   * Detail Order
   * @param order 
   */
  detailOrder(order) {
    this.orderService.setOrder(order);
    this.dialog.open(DetailOrderComponent, {
      autoFocus: false,
      minWidth: 500,
      maxHeight:'90vh'
    })
  }

  /**
   * Process Order
   * @param order 
   */
  processOrder(order) {
    this.orderService.setOrder(order);
    this.dialog.open(ProcessOrderComponent, {
      autoFocus: false,
      minWidth: 500
    })
  }

}
