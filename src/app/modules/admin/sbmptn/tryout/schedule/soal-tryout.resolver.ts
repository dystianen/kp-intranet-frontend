import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoalService } from '../../soal/soal.service';
import { ScheduleService } from './schedule.service';


@Injectable({
  providedIn: 'root'
})
export class SoalTryoutResolver implements Resolve<any> {

  constructor(private _soalService: SoalService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._soalService.getSoals('tryout');
  }
}
