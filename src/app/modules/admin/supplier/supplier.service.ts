import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Suppliers } from './suppliers.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _suppliers: BehaviorSubject<Suppliers[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {

  }

  get suppliers$(): Observable<Suppliers[]> {
    return this._suppliers.asObservable();
  }


  /**
   * get suppliers
   * @returns 
   */
  getsuppliers(): Observable<Suppliers[]> {
    return this._httpClient.get<Suppliers[]>(`${environment.apiUrl}/admin/supplier`).pipe(tap((suppliers: any) => {
      if (suppliers.statusCode == 200) {
        this._suppliers.next(suppliers.data);
      }
    }))
  }

  /**
   * Create Product
   * @returns 
   */
  createSupplier(dataSupplier: any): Observable<any> {
    return this.suppliers$.pipe(
      take(1),
      switchMap(products => this._httpClient.post<Suppliers>(`${environment.apiUrl}/admin/supplier`, dataSupplier)
        .pipe(tap((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newProduct) => {
            // Update the products with the new product
            this._suppliers.next([newProduct.data, ...products]);
            // Return the new product
            return newProduct;
          })
        ))
    );
  }

}
