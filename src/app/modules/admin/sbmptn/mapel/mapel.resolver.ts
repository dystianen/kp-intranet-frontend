import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MapelService } from './mapel.service';

@Injectable({
  providedIn: 'root'
})
export class MapelResolver implements Resolve<any[]> {
  constructor(private _mapelService: MapelService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this._mapelService.getMapels();
  }
}
