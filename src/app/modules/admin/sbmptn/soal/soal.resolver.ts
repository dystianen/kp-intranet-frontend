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
    const {category_id} = route.params;
    this._soalService.curentCategory = category_id??'latihan_soal';
    return this._soalService.getSoals(category_id??'latihan_soal');
  }
}
