import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InputStockService } from './input-stock.service';

@Injectable({
  providedIn: 'root'
})
export class InputStockResolver implements Resolve<boolean> {
  constructor(private inputStockService: InputStockService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.inputStockService.getInputStocks();
  }
}
