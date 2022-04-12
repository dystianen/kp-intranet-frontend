import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttributeModel } from 'app/model/attribute.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private _attributes: BehaviorSubject<AttributeModel[] | null> = new BehaviorSubject(null);
  private _attribute: BehaviorSubject<AttributeModel | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get attributes$(): Observable<AttributeModel[]> {
    return this._attributes.asObservable()
  }

  get attribute$(): Observable<AttributeModel> {
    return this._attribute.asObservable()
  }

  getAttributes(): Observable<AttributeModel[]> {
    return this._httpClient.get<AttributeModel[]>(`${environment.apiUrl}/admin/product-attribute`).pipe(map((response: any) => {
      if (response.statusCode == 200) {
        this._attributes.next(response.data);
        return response.data;
      }
      return []
    }))
  }

  getAttribute(id: number): Observable<AttributeModel> {
    return this._httpClient.get<AttributeModel>(`${environment.apiUrl}/admin/product-attribute/${id}`).pipe(map((response: any) => {
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
  createAttribute(dataAttribute: any): Observable<AttributeModel> {
    return this.attributes$.pipe(
      take(1),
      switchMap(attributes => this._httpClient.post<AttributeModel>(`${environment.apiUrl}/admin/product-attribute`, dataAttribute)
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
  updateAttribute(id: number, dataAttribute: any): Observable<AttributeModel> {
    return this.attributes$.pipe(
      take(1),
      switchMap(attributes => this._httpClient.patch<AttributeModel>(`${environment.apiUrl}/admin/product-attribute/${id}`, dataAttribute)
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
