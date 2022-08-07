import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'app/model/order.model';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {

  order$: Observable<OrderModel>;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order$ = this.orderService.order;
  }
}
