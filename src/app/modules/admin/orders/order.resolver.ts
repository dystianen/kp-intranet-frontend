import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { OrderModel } from 'app/model/order.model';
import { Observable, of } from 'rxjs';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<OrderModel[]> {

  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel[]> {
    return this.orderService.getOrders();
  }
  
}
