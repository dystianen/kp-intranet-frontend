import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { OrderOffline } from 'app/model/order.offline';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderOfflineService {

  private _orders: BehaviorSubject<OrderOffline[] | null> = new BehaviorSubject(null);

  
  constructor(private httpClient: HttpClient) { }

  get orders$() {
    return this._orders.asObservable();
  }
  
   /**
   * get orders
   * @returns 
   */
    getOrders(status: any = null): Observable<OrderOffline[]> {
      return this.httpClient.get<OrderOffline[]>(`${environment.apiUrl}${API.ADMIN_ORDERS_OFFLINE}`).pipe(map((orders: any) => {
        if (orders.statusCode == 200) {
          this._orders.next(orders.data);
          return orders.data;
        }
        return [];
      }))
    }
    
}
