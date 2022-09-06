import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { OrderOffline } from 'app/model/order.offline';
import { Observable, of } from 'rxjs';
import { OrderOfflineService } from './order-offline.service';

@Injectable({
  providedIn: 'root'
})
export class OrderOfflineResolver implements Resolve<OrderOffline[]> {
  constructor(private orderService: OrderOfflineService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderOffline[]> {
    return this.orderService.getOrders();
  }
}
