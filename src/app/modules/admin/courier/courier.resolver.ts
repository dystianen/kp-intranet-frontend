import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourierService } from './courier.service';
import { Courier } from './courier.types';

@Injectable({
  providedIn: 'root'
})
export class CourierResolver implements Resolve<Courier[]> {

  constructor(private _service: CourierService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Courier[]> {
    return this._service.getCouriers();
  }

}
