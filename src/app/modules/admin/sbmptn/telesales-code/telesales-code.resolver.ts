import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TelesalesCodeService } from './telesales-code.service';

@Injectable({
  providedIn: 'root'
})
export class TelesalesCodeResolver implements Resolve<any> {

  constructor(private _teleSalesCodeService: TelesalesCodeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._teleSalesCodeService.getTelesalesCodes();
  }
}
