import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoalService } from './soal.service';


@Injectable({
  providedIn: 'root'
})
export class SoalResolver implements Resolve<any[]> {
  constructor(private _soalService: SoalService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    // const {mapel_uuid} = route.params;
    return this._soalService.getSoals();
  }
}
