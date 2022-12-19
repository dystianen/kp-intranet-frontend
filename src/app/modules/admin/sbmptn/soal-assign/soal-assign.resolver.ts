import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoalAssignService } from './soal-assign.service';

@Injectable({
  providedIn: 'root'
})
export class SoalAssignResolver implements Resolve<any> {

  constructor(private _soalAssignService: SoalAssignService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._soalAssignService.getSoalAssigns();
  }
}
