import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { Product } from './product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _sites: BehaviorSubject<Product[] | null> = new BehaviorSubject(null);
  private _site: BehaviorSubject<Product | null> = new BehaviorSubject(null);

  private _showBackButton: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) { }

  get showBackButton$() {
    return this._showBackButton.asObservable().pipe(delay(0));
  }

  setShowBackButton(show: boolean) {
    this._showBackButton.next(show);
  }

  get products$() {
    return this._sites.asObservable();
  }

  get product$() {
    return this._site.asObservable();
  }

  /**
   * get products
   * @returns 
   */
  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${environment.apiUrl}/admin/product`).pipe(map((products: any) => {
      if (products.statusCode == 200) {
        this._sites.next(products.data);
        return products.data;
      }
      return [];
    }))
  }

  /**
  * get products
  * @param id 
  * @returns 
  */
  getProduct(id): Observable<any> {
    return this._httpClient.get<Product>(`${environment.apiUrl}/admin/product/${id}`).pipe(map((product: any) => {
      if (product.statusCode == 200) {
        this._site.next(product.data);
        return product.data;
      }
      return [];
    }));
  }

  /**
   * Create Product
   * @returns 
   */
  createProduct(dataProduct: any): Observable<any> {
    return this.products$.pipe(
      take(1),
      switchMap(products => this._httpClient.post<Product>(`${environment.apiUrl}/admin/product`, dataProduct)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newProduct) => {
            // Update the products with the new product
            // this._sites.next([newProduct.data, ...products]);
            // Return the new product
            return newProduct;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataProduct 
   * @returns 
   */
  updateProduct(id: number, dataProduct: any): Observable<Product> {
    return this.products$.pipe(
      take(1),
      switchMap(products => this._httpClient.patch<Product>(`${environment.apiUrl}/admin/product/${id}`, dataProduct)
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
