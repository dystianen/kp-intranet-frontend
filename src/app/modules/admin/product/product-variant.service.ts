import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { ProductVariant } from 'app/model/product-variant.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  constructor(private httpClient : HttpClient) { }

  private _productVariants : BehaviorSubject<ProductVariant[] | null> = new BehaviorSubject(null);
  
  get $productVariants ():Observable<ProductVariant[]>{
    return this._productVariants.asObservable();
  }

  getProductVariants():Observable<ProductVariant[]>{
    return this.httpClient.get<ProductVariant[]>(`${environment.apiUrl}${API.ADMIN_PRODUCT_PRODUCT_VARIANT}`).pipe(map((productVariant: any) => {
      if (productVariant.statusCode == 200) {
        this._productVariants.next(productVariant.data);
        return productVariant.data;
      }
      return [];
    }))
  }
}
