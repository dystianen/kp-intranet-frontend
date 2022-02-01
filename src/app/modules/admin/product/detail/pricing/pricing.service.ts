import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pricing } from './pricing';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private _pricings: BehaviorSubject<Pricing[]> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {

  }
  get pricings$() {
    return this._pricings.asObservable();
  }

  /**
   * get pricing by product id
   * @param id 
   * @returns 
   */
  getPricings(id: number): Observable<Pricing[]> {
    this._pricings.next([]);
    return this.httpClient.get<Pricing[]>(`${environment.apiUrl}/admin/product/pricing/${id}`).pipe(map((pricing: any) => {
      if (pricing.statusCode == 200) {
        this._pricings.next(pricing.data);
        return pricing.data;
      }
      return [];
    }))
  }

  /**
   * add pricing
   * @param productId 
   * @param siteId 
   */
  addPrice(productId: number, siteId: number, sellPrice: number) {
    return this.httpClient.patch(`${environment.apiUrl}/admin/product/pricing`, {
      productId,
      siteId,
      sellPrice
    });
  }


}
