import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductTypeFactory } from './product-type-factory';
import { ProductService } from './product.service';
import { Product } from './product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product[]> {
  constructor(private _productServices: ProductService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const productType = new ProductTypeFactory(state.url);
    return this._productServices.getProducts(productType.getType().type);
  }
}
