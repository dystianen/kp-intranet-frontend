import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReportsService } from './reports.service';

@Injectable({
  providedIn: 'root'
})
export class StocksResolver implements Resolve<any[]> {
  constructor(private reportService: ReportsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.reportService.getStocks();
  }
}
