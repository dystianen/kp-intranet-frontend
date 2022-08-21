import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
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
  displayedColumns: string[] = ["orderNumber", "amount", "order_status", "payment", "options"];

  status: Observable<string>;

  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.initTable()
  }

  /**
  * Initial table
  */
  initTable() {
    this.orderService.orders$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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
      maxHeight: '90vh'
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

  confirmPayment(order) {
    Swal.fire({
      title: 'Konfirmasi Pembayaran',
      text: "Anda akan mengkonfirmasi bahwa order #" + order.orderNumber + " telah di bayar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Konfirmasi'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.confirmPayment(order.orderNumber).subscribe((res) => {
          if (res.data) {
            if (res.data.orderNumber == order.orderNumber) {
              this.orderService.getOrders(order.orderStatusId).subscribe();
            }
          }
        })
      }
    })
  }

}
