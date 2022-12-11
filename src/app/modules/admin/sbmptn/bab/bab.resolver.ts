import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BabService } from './bab.service';

@Injectable({
  providedIn: 'root'
})
export class BabResolver implements Resolve<any[]> {
  constructor(private _babService: BabService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    const {mapel_uuid} = route.params;
    return this._babService.getBabs(mapel_uuid);
  }
}