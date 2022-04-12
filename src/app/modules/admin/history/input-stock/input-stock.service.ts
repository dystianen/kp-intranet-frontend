import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { find, map, tap } from 'rxjs/operators';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class InputStockService {

  constructor(private httpClient: HttpClient) { }

  private _input_stocks: BehaviorSubject<any> = new BehaviorSubject(null);

  get input_stocks$() {
    return this._input_stocks.asObservable();
  }

  getInputStocks(): Observable<any> {
    this._input_stocks.next([]);
    return this.httpClient.get(`${environment.apiUrl}/admin/history/input-stock`).pipe(map((res: any) => {
      if (res.statusCode == 200) {
        this._input_stocks.next(res.data);
        return res.data;
      }
      return [];
    }))
  }

  findProductBySku(sku: any): Observable<any> {
    return this.input_stocks$.pipe(
      map((item) => {
        return _.find(item, { sku: sku })??{}
      })
    )
  }

}
