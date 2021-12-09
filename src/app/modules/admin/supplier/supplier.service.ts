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
  private _supplier: BehaviorSubject<Suppliers | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {

  }

  get suppliers$(): Observable<Suppliers[]> {
    return this._suppliers.asObservable();
  }

  get supplier$(): Observable<Suppliers> {
    return this._supplier.asObservable();
  }


  /**
   * get suppliers
   * @returns 
   */
  getSuppliers(): Observable<Suppliers[]> {
    return this._httpClient.get<Suppliers[]>(`${environment.apiUrl}/admin/supplier`).pipe(map((suppliers: any) => {
      if (suppliers.statusCode == 200) {
        this._suppliers.next(suppliers.data);
        return suppliers.data;
      }
      return [];
    }))
  }

  /**
   * get suppliers
   * @param id 
   * @returns 
   */
  getSupplier(id): Observable<any> {
    return this._httpClient.get<Suppliers>(`${environment.apiUrl}/admin/supplier/${id}`).pipe(map((suppliers: any) => {
      if (suppliers.statusCode == 200) {
        this._supplier.next(suppliers.data);
        return suppliers.data;
      }
      return [];
    }));
  }

  /**
   * Create Product
   * @returns 
   */
  createSupplier(dataSupplier: any): Observable<any> {
    return this.suppliers$.pipe(
      take(1),
      switchMap(suppliers => this._httpClient.post<Suppliers>(`${environment.apiUrl}/admin/supplier`, dataSupplier)
        .pipe(tap((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newSupplier) => {
            // Update the suppliers with the new product
            this._suppliers.next([newSupplier.data, ...suppliers]);
            // Return the new product
            return newSupplier;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataSupplier 
   * @returns 
   */
  updateSupplier(id: number, dataSupplier: any): Observable<Suppliers> {
    return this.suppliers$.pipe(
      take(1),
      switchMap(suppliers => this._httpClient.patch<Suppliers>(`${environment.apiUrl}/admin/supplier/${id}`, dataSupplier)
        .pipe(tap((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

  /**
   * delete supplier
   * @param id 
   * @returns 
   */
  deleteSupplier(id: number) {
    return this.suppliers$.pipe(
      take(1),
      switchMap(suppliers => this._httpClient.delete<Suppliers>(`${environment.apiUrl}/admin/supplier/${id}`)
        .pipe(tap((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

}
