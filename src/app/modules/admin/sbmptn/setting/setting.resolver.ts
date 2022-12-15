import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class SettingResolver implements Resolve<any> {

  constructor(private _settingService: SettingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._settingService.getSettings();
  }
}
