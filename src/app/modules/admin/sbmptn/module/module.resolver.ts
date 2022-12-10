import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModuleService } from './module.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleResolver implements Resolve<any[]> {
  constructor(private _moduleService: ModuleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this._moduleService.getModules();
  }
}
