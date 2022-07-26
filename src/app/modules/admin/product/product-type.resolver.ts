import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ProductTypeModel } from 'app/model/product-type.model';
import { Observable, of } from 'rxjs';
import { ProductTypeService } from './product-type.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeResolver implements Resolve<ProductTypeModel[]> {
  constructor(private productTypeService: ProductTypeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductTypeModel[]> {
    return this.productTypeService.getProductTypes();
  }
}
