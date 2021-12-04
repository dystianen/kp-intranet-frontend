import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Attribute } from './attribute.types';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private _attributes: BehaviorSubject<Attribute[] | null> = new BehaviorSubject(null);
  private _attribute: BehaviorSubject<Attribute | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get attributes$(): Observable<Attribute[]> {
    return this._attributes.asObservable()
  }

  get attribute$(): Observable<Attribute> {
    return this._attribute.asObservable()
  }

  getAttributes(): Observable<Attribute[]> {
    return this._httpClient.get<Attribute[]>(`${environment.apiUrl}/admin/product-attribute`).pipe(map((response: any) => {
      if (response.statusCode == 200) {
        this._attributes.next(response.data);
        return response.data;
      }
      return []
    }))
  }

  getAttribute(id: number): Observable<Attribute> {
    return this._httpClient.get<Attribute>(`${environment.apiUrl}/admin/product-attribute/${id}`).pipe(map((response: any) => {
      if (response.statusCode == 200) {
        this._attribute.next(response.data);
        return response.data;
      }
      return []
    }))
  }

  /**
     * Create Product
     * @returns 
     */
  createAttribute(dataAttribute: any): Observable<Attribute> {
    return this.attributes$.pipe(
      take(1),
      switchMap(attributes => this._httpClient.post<Attribute>(`${environment.apiUrl}/admin/product-attribute`, dataAttribute)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newAttribute) => {
            // Update the attributes with the new product
            // this._attributes.next([newAttribute.data, ...attributes]);
            // Return the new product
            return newAttribute;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataAttribute 
   * @returns 
   */
  updateAttribute(id: number, dataAttribute: any): Observable<Attribute> {
    return this.attributes$.pipe(
      take(1),
      switchMap(attributes => this._httpClient.patch<Attribute>(`${environment.apiUrl}/admin/product-attribute/${id}`, dataAttribute)
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
