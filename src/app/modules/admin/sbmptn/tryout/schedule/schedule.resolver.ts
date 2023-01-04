import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ScheduleService } from '../../schedule/schedule.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolver implements Resolve<any> {

  constructor(private _scheduleService: ScheduleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._scheduleService.getSchedules();
  }
}
