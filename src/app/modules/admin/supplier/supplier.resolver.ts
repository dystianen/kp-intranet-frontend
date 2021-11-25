import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupplierService } from './supplier.service';
import { Suppliers } from './suppliers.types';

@Injectable({
  providedIn: 'root'
})

export class SupplierResolver implements Resolve<any> {

  constructor(private _supplierService: SupplierService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Suppliers[]> {
    return this._supplierService.getsuppliers();
  }
  
}
