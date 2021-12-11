import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoleService } from './role.service';
import { Role } from './role.types';

@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<Role[]> {

  constructor(private _service: RoleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    return this._service.getRoles();
  }
}
