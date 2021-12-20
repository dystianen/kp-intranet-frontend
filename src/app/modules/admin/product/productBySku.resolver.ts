import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductBySkuResolver implements Resolve<Product> {
  constructor(private _productServices: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    // return this._productServices.getProducts();
    const sku = route.params.sku;
    console.log(sku);
    return;
  }
}
