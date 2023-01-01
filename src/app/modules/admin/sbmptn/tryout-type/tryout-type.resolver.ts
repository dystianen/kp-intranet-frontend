import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TryoutTypeService } from './tryout-type.service';

@Injectable({
  providedIn: 'root'
})
export class TryoutTypeResolver implements Resolve<any> {

  constructor(private _typeService: TryoutTypeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._typeService.getTryoutTypes();
  }
}
