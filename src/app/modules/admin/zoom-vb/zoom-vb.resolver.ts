import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ZoomVbService } from './zoom-vb.service';

@Injectable({
  providedIn: 'root'
})
export class ZoomVbResolver implements Resolve<any> {
  constructor(private _zoomVbService: ZoomVbService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._zoomVbService.getZoomVbs()
  }
}
