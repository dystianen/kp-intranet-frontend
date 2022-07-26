import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { ProductTypeModel } from 'app/model/product-type.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private httpClient : HttpClient) { }

  private _productTypes : BehaviorSubject<ProductTypeModel[] | null> = new BehaviorSubject(null);
  
  get $productTypes ():Observable<ProductTypeModel[]>{
    return this._productTypes.asObservable();
  }

  getProductTypes():Observable<ProductTypeModel[]>{
    return this.httpClient.get<ProductTypeModel[]>(`${environment.apiUrl}${API.ADMIN_PRODUCT_PRODUCT_TYPE}`).pipe(map((productType: any) => {
      if (productType.statusCode == 200) {
        this._productTypes.next(productType.data);
        return productType.data;
      }
      return [];
    }))
  }
}
