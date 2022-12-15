import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root'
})
export class ClassResolver implements Resolve<any> {
  constructor(private _classService: ClassService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this._classService.getClasses();
  }
}
