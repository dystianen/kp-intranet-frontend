import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { OrderModel } from 'app/model/order.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orders: BehaviorSubject<OrderModel[] | null> = new BehaviorSubject(null);
  private _order: BehaviorSubject<OrderModel | null> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) { }

  get orders$() {
    return this._orders.asObservable();
  }

  get order$() {
    return this._order.asObservable();
  }

  /**
   * get orders
   * @returns 
   */
  getOrders(): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(`${environment.apiUrl}${API.ADMIN_ORDERS}`).pipe(map((orders: any) => {
      if (orders.statusCode == 200) {
        this._orders.next(orders.data);
        return orders.data;
      }
      return [];
    }))
  }

}
