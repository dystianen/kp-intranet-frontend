import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardsService } from './dashboards.service';

@Injectable({
  providedIn: 'root'
})
export class SalesResolver implements Resolve<boolean> {
  constructor(private dashboarsService: DashboardsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
