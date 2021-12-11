import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Courier } from './courier.types';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  private _couriers: BehaviorSubject<Courier[] | null> = new BehaviorSubject(null);
  private _courier: BehaviorSubject<Courier | null> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get couriers$() {
    return this._couriers.asObservable();
  }

  get courier$() {
    return this._courier.asObservable();
  }

  /**
   * get couriers
   * @returns 
   */
  getCouriers(): Observable<Courier[]> {
    return this._httpClient.get<Courier[]>(`${environment.apiUrl}/admin/courier`).pipe(map((couriers: any) => {
      if (couriers.statusCode == 200) {
        this._couriers.next(couriers.data);
        return couriers.data;
      }
      return [];
    }))
  }

   /**
   * get couriers
   * @param id 
   * @returns 
   */
    getCourier(id): Observable<any> {
      return this._httpClient.get<Courier>(`${environment.apiUrl}/admin/courier/${id}`).pipe(map((courier: any) => {
        if (courier.statusCode == 200) {
          this._courier.next(courier.data);
          return courier.data;
        }
        return [];
      }));
    }
  
    /**
     * Create Product
     * @returns 
     */
    createCourier(dataCourier: any): Observable<any> {
      return this.couriers$.pipe(
        take(1),
        switchMap(couriers => this._httpClient.post<Courier>(`${environment.apiUrl}/admin/courier`, dataCourier)
          .pipe(map((response: any) => {
            if (response.statusCode == 200) {
              return response.data;
            }
            return [];
          }))
          .pipe(
            map((newCourier) => {
              // Update the couriers with the new product
              // this._couriers.next([newCourier.data, ...couriers]);
              // Return the new product
              return newCourier;
            })
          ))
      );
    }
  
    /**
     * update supplier
     * @param id 
     * @param dataCourier 
     * @returns 
     */
    updateCourier(id: number, dataCourier: any): Observable<Courier> {
      return this.couriers$.pipe(
        take(1),
        switchMap(couriers => this._httpClient.patch<Courier>(`${environment.apiUrl}/admin/courier/${id}`, dataCourier)
          .pipe(map((response: any) => {
            if (response.statusCode == 200) {
              return response.data;
            }
            return [];
          }))
        )
      )
    }
    
}
