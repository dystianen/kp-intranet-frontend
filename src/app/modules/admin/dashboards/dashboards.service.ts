import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { OrderModel } from 'app/model/order.model';
import { environment } from 'environments/environment';
import API from 'api/API';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  #sales_: BehaviorSubject<OrderModel[] | null> = new BehaviorSubject(null);
  #users_: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) { }

  get sales$(): Observable<OrderModel[]> {
    return this.#sales_.asObservable();
  }

  get customers$(): Observable<OrderModel[]> {
    return this.#users_.asObservable();
  }

  /**
   * get sales order
   * @returns 
   */
  getSales(): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(`${environment.apiUrl}${API.DASHBOARDS_SALES}`).pipe(map((sales: any) => {
      if (sales.statusCode == 200) {
        this.#sales_.next(sales.data);
        return sales.data;
      }
      return [];
    }))
  }

  /**
   * Get users dashboards
   * @returns 
   */
  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}${API.DASHBOARDS_USERS}`).pipe(map((users: any) => {
      if (users.statusCode == 200) {
        this.#users_.next(users.data);
        return users.data;
      }
      return [];
    }))
  }



}
