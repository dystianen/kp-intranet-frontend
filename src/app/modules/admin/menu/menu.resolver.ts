import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuService } from './menu.service';
import { Menu } from './menu.types';

@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<Menu[]> {

  constructor(private _service: MenuService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Menu[]> {
    return this._service.getMenus();
  }
}
