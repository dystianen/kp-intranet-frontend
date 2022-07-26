import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ProductVariant } from 'app/model/product-variant.model';
import { Observable, of } from 'rxjs';
import { ProductVariantService } from './product-variant.service';


@Injectable({
  providedIn: 'root'
})
export class ProductVariantResolver implements Resolve<ProductVariant[]> {
  constructor(private productTypeService: ProductVariantService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductVariant[]> {
    return this.productTypeService.getProductVariants();
  }
}
