import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'app/model/order.model';
import { OrderItemModel } from 'app/model/order-item.model';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  order$: Observable<OrderModel>;

  displayColumnsPricing: string[] = ["product", "price", "qty", "total_price"];
  dataSourcePricing: MatTableDataSource<OrderItemModel>

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order$ = this.orderService.order;
    this.order$.subscribe((data) => {
      this.dataSourcePricing = new MatTableDataSource(data.order_items);
    })
  }

}
