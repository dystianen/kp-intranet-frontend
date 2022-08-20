import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { OrderModel } from 'app/model/order.model';
import { Observable, of } from 'rxjs';
import { DashboardsService } from './dashboards.service';

@Injectable({
  providedIn: 'root'
})
export class SalesResolver implements Resolve<OrderModel[]> {
  constructor(private dashboarsService: DashboardsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel[]> {
    return this.dashboarsService.getSales();
  }
}
